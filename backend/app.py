from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
from predict import predict_disease
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Flask Config
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "default-secret")
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'users.db')

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "jwt-secret")

# Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Gemini API Setup
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise EnvironmentError("GOOGLE_API_KEY not found in .env file.")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Initialize DB
with app.app_context():
    db.create_all()

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify({'token': access_token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Token Verification
@app.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    current_user = get_jwt_identity()
    return jsonify({'email': current_user}), 200

# Prediction Route
@app.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400

        prediction, confidence, remedy = predict_disease(file)

        return jsonify({
            'prediction': prediction,
            'confidence': confidence,
            'remedy': remedy
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
