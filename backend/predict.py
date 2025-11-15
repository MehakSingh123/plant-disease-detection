import os
import io
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Load the model
model = load_model('model/best_model.h5')

# Class names
class_names = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

# ✅ FIXED: Remedy function using Gemini properly
# Function to get remedy using Gemini 1.5 Flash
def get_remedy(disease_name):
    prompt = f"You are an agricultural expert. Provide a simple remedy in 2 samll points for cure of the plant disease: '{disease_name}'."
    try:
        model = genai.GenerativeModel("models/gemini-2.0-flash")  # Correct model name
        response = model.generate_content(prompt)  # Still the correct method for now
        return response.text.strip()
    except Exception as e:
        print("[Gemini API Error]", e)
        return "No remedy available due to an API error."


# Main prediction function
def predict_disease(file):
    try:
        img_bytes = file.read()
        img = image.load_img(io.BytesIO(img_bytes), target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)[0]

        if len(prediction) != len(class_names):
            raise ValueError("Prediction length mismatch with class names.")

        predicted_class = class_names[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        # Remedy
        if "healthy" in predicted_class.lower():
            remedy = "The plant appears healthy. No remedy needed."
        else:
            remedy = get_remedy(predicted_class)

        return predicted_class, round(confidence * 100, 2), remedy

    except Exception as e:
        print(f"[Prediction Error] {e}")
        raise e
