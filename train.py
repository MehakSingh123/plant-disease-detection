import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt
import tensorflow as tf

# Optimize for CPU training on Mac
tf.config.threading.set_intra_op_parallelism_threads(0)  # Use all CPU cores
tf.config.threading.set_inter_op_parallelism_threads(0)  # Use all CPU cores

print(f"TensorFlow version: {tf.__version__}")
print(f"Using {tf.config.threading.get_intra_op_parallelism_threads()} CPU threads")

# --- MACBOOK AIR OPTIMIZED CONFIG ---
train_folder = 'data_split/train'
test_folder = 'data_split/test'
img_size = 224  # Smaller for faster CPU processing
batch_size = 16  # Smaller batch size for CPU
epochs = 8   # Fewer epochs for faster training

# --- Optimized Image Loading for CPU ---
def load_dataset_optimized(folder_path, class_names, max_images_per_class=300):
    """Load dataset with limits optimized for CPU training"""
    images = []
    labels = []
    
    print(f"Loading from: {folder_path}")
    for idx, class_name in enumerate(class_names):
        class_path = os.path.join(folder_path, class_name)
        if not os.path.isdir(class_path):
            print(f"Directory not found: {class_path}")
            continue
            
        files = [f for f in os.listdir(class_path) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
        
        # Limit images per class for faster training on CPU
        if max_images_per_class:
            files = files[:max_images_per_class]
            
        print(f"Loading {len(files)} images from {class_name}...")
        
        for i, file in enumerate(files):
            try:
                img_path = os.path.join(class_path, file)
                img = cv2.imread(img_path)
                if img is None:
                    continue
                img = cv2.resize(img, (img_size, img_size))
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                images.append(img)
                labels.append(idx)
                
                # Progress indicator
                if (i + 1) % 50 == 0:
                    print(f"  Loaded {i + 1}/{len(files)} images from {class_name}")
                    
            except Exception as e:
                print(f"Error loading {file}: {e}")
                
    return np.array(images, dtype=np.float32), np.array(labels)

# --- Get class names from train folder ---
if not os.path.exists(train_folder):
    print(f"❌ Train folder not found: {train_folder}")
    exit(1)

class_names = sorted([d for d in os.listdir(train_folder) if os.path.isdir(os.path.join(train_folder, d))])
num_classes = len(class_names)
print(f"Found {num_classes} classes: {class_names}")

if num_classes == 0:
    print("❌ No class folders found in train directory!")
    exit(1)

os.makedirs("model", exist_ok=True)
with open("model/class_names.txt", "w") as f:
    f.write("\n".join(class_names))

# --- Load Train Data ---
print("📥 Loading training data...")
X, y = load_dataset_optimized(train_folder, class_names, max_images_per_class=300)

if len(X) == 0:
    print("❌ No training images found!")
    exit(1)

X = X / 255.0
print(f"Loaded {len(X)} training images")

# --- Train/Validation Split ---
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
print(f"Training: {len(X_train)} samples, Validation: {len(X_val)} samples")

# --- Minimal Data Augmentation for CPU ---
datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    zoom_range=0.1,
    fill_mode='nearest'
)

# --- Lightweight Model for CPU ---
print("🏗️ Building model...")
base_model = MobileNetV2(
    input_shape=(img_size, img_size, 3),
    include_top=False,
    weights='imagenet',
    alpha=0.75  # Reduced model complexity
)

# Freeze base model for faster training
base_model.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(64, activation='relu')(x)  # Smaller layer
x = Dropout(0.3)(x)
predictions = Dense(num_classes, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# --- Optimized Compilation for CPU ---
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(f"Model parameters: {model.count_params():,}")

# --- Callbacks ---
callbacks = [
    ModelCheckpoint(
        "model/best_model.h5",
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    ),
    EarlyStopping(
        monitor='val_loss',
        patience=3,
        restore_best_weights=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=2,
        min_lr=1e-6,
        verbose=1
    )
]

# --- Training ---
print("🚀 Training model...")
print(f"Training on {len(X_train)} samples, validating on {len(X_val)} samples")

steps_per_epoch = max(1, len(X_train) // batch_size)
print(f"Steps per epoch: {steps_per_epoch}")

history = model.fit(
    datagen.flow(X_train, y_train, batch_size=batch_size),
    validation_data=(X_val, y_val),
    epochs=epochs,
    callbacks=callbacks,
    verbose=1,
    steps_per_epoch=steps_per_epoch
)

# --- Save final model ---
model.save("model/plant_disease_model_final.h5")
print("✅ Model saved at: model/plant_disease_model_final.h5")

# --- Plot Training History ---
try:
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

    # Accuracy plot
    ax1.plot(history.history['accuracy'], label='Train Accuracy', color='blue')
    ax1.plot(history.history['val_accuracy'], label='Val Accuracy', color='red')
    ax1.set_title('Training and Validation Accuracy')
    ax1.set_xlabel('Epochs')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    ax1.grid(True)

    # Loss plot
    ax2.plot(history.history['loss'], label='Train Loss', color='blue')
    ax2.plot(history.history['val_loss'], label='Val Loss', color='red')
    ax2.set_title('Training and Validation Loss')
    ax2.set_xlabel('Epochs')
    ax2.set_ylabel('Loss')
    ax2.legend()
    ax2.grid(True)

    plt.tight_layout()
    plt.savefig("model/training_history.png", dpi=150, bbox_inches='tight')
    plt.show()
    print("📊 Training plots saved")
except Exception as e:
    print(f"Error plotting: {e}")

# --- Load and Evaluate Test Data ---
if os.path.exists(test_folder):
    print("📦 Evaluating on test folder...")
    X_test, y_test = load_dataset_optimized(test_folder, class_names, max_images_per_class=100)
    
    if len(X_test) > 0:
        X_test = X_test / 255.0
        print(f"Testing on {len(X_test)} images")
        
        # --- Predict ---
        y_pred_probs = model.predict(X_test, batch_size=batch_size, verbose=1)
        y_pred = np.argmax(y_pred_probs, axis=1)
        
        # --- Classification Report ---
        print("\n📊 Classification Report on Test Set:\n")
        print(classification_report(y_test, y_pred, target_names=class_names))
        
        # --- Simple Accuracy ---
        from sklearn.metrics import accuracy_score
        overall_accuracy = accuracy_score(y_test, y_pred)
        print(f"\n🎯 Overall Test Accuracy: {overall_accuracy:.4f}")
        
        # --- Save predictions ---
        np.save("model/test_predictions.npy", y_pred_probs)
        print("💾 Test predictions saved")
        
    else:
        print("No test images found!")
else:
    print("No test folder found, skipping evaluation")

print("\n🎉 Training completed!")
print(f"📁 Models saved in: {os.path.abspath('model')}")

# --- Quick model summary ---
print("\n📋 Model Summary:")
print(f"• Classes: {num_classes}")
print(f"• Training samples: {len(X_train)}")
print(f"• Validation samples: {len(X_val)}")
print(f"• Model parameters: {model.count_params():,}")
print(f"• Image size: {img_size}x{img_size}")
print(f"• Batch size: {batch_size}")
print(f"• Epochs trained: {len(history.history['accuracy'])}")

if history.history['val_accuracy']:
    best_val_acc = max(history.history['val_accuracy'])
    print(f"• Best validation accuracy: {best_val_acc:.4f}")