from flask import Flask, render_template, request, redirect, send_from_directory, jsonify
from flask_cors import CORS  
import numpy as np
import json
import uuid
import os
import tensorflow as tf

app = Flask(__name__)
CORS(app)  

# Load model
model = tf.keras.models.load_model("models/plant_disease_recog_model_pwp.keras")

# Labels (matching model classes)
label = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Background_without_leaves', 'Blueberry___healthy', 'Cherry___Powdery_mildew', 'Cherry___healthy',
    'Corn___Cercospora_leaf_spot Gray_leaf_spot', 'Corn___Common_rust', 'Corn___Northern_Leaf_Blight', 'Corn___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
    'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
    'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Load YOUR plant_disease.json ARRAY (your 38 entries)
try:
    with open("plant_disease.json", 'r') as file:
        plant_disease = json.load(file)
    print(f" Loaded {len(plant_disease)} disease entries")
except Exception as e:
    print(f" JSON Error: {e}")
    plant_disease = []

# Create upload folder
os.makedirs("uploadimages", exist_ok=True)

@app.route('/uploadimages/<path:filename>')
def uploaded_images(filename):
    return send_from_directory('./uploadimages', filename)

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

def extract_features(image_path):
    """Convert image to model input format"""
    image = tf.keras.utils.load_img(image_path, target_size=(160, 160))
    feature = tf.keras.utils.img_to_array(image)
    return np.array([feature])

def model_predict(image_path):
    """Predict disease with error handling"""
    try:
        print(f"🔍 Predicting: {image_path}")
        img = extract_features(image_path)
        prediction = model.predict(img, verbose=0)
        prediction_idx = prediction.argmax()
        print(f" Prediction index: {prediction_idx}")
        
        # YOUR JSON IS ARRAY[0], ARRAY[1], etc.
        if 0 <= prediction_idx < len(plant_disease):
            prediction_data = plant_disease[prediction_idx]
            print(f"Found: {prediction_data['name']}")
        else:
            prediction_data = {
                'name': 'Unknown Plant',
                'cause': 'Model could not identify',
                'cure': 'Consult agricultural expert'
            }
        return prediction_data
    except Exception as e:
        print(f" PREDICTION ERROR: {e}")
        return {
            'name': 'Prediction Error',
            'cause': str(e),
            'cure': 'Check Flask console for details'
        }

@app.route('/upload/', methods=['POST', 'GET'])
def uploadimage():
    if request.method == "POST":
        image = request.files['img']
        if image.filename == '':
            return redirect('/')
        
        temp_name = f"uploadimages/temp_{uuid.uuid4().hex}"
        image_path = f'{temp_name}_{image.filename}'
        image.save(image_path)
        print(f' Saved HTML image: {image_path}')
        
        prediction = model_predict(image_path)
        return render_template('home.html', 
                             result=True, 
                             imagepath=f'/{image_path}', 
                             prediction=prediction)
    return redirect('/')

@app.route('/api/predict', methods=['POST'])
def api_predict():
    print(" API /predict called from React!")
    
    if 'image' not in request.files:
        print(" No image in request")
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    if image.filename == '':
        print(" Empty filename")
        return jsonify({'error': 'No image selected'}), 400
    
    temp_name = f"uploadimages/temp_{uuid.uuid4().hex}"
    image_path = f'{temp_name}_{image.filename}'
    
    try:
        image.save(image_path)
        print(f' Saved API image: {image_path}')
        prediction_data = model_predict(image_path)
        
        print(f" Sending to React: {prediction_data['name']}")
        # PERFECT React format
        return jsonify({
            'name': prediction_data['name'],
            'cause': prediction_data['cause'],
            'cure': prediction_data['cure'],
            'image': f'/{image_path}'
        })
    except Exception as e:
        print(f" API ERROR: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print(" Plant Disease Detection API")
    app.run(debug=True, port=5000)
