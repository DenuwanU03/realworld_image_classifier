# Cat vs Dog Image Classifier (Full-Stack AI App)

A complete end-to-end AI application that classifies images as **Cat** or **Dog** using deep learning and transfer learning.

This project includes:
- Model training with TensorFlow
- FastAPI backend for inference
- React frontend for image upload and prediction

---

## Demo Features
- Upload any image
- AI predicts **Cat** or **Dog**
- Shows prediction confidence
- Real-time inference

---

## Model Details
- Architecture: **MobileNetV2 (Transfer Learning)**
- Dataset: Cats vs Dogs (custom cleaned split)
- Train Accuracy: ~98%
- Test Accuracy: ~98%
- Loss Function: Binary Crossentropy
- Optimizer: Adam

---

## Project Structure
realworld_image_classifier/
├── backend/ # FastAPI backend
├── frontend/ # React frontend
├── models/ # Trained model (.keras)
├── notebooks/ # Training & experiments
├── reports/ # Metrics, confusion matrix
├── requirements.txt
└── README.md

---

## ▶️ How to Run Locally

###1.Backend
conda activate ai_env
cd realworld_image_classifier
uvicorn backend.app:app --reload --port 8000

check :
http://127.0.0.1:8000/health


##2.Frontend

cd frontend
npm install
npm run dev

Open :
http://localhost:5173

Tech Stack

Python
TensorFlow / Keras
FastAPI
React (Vite)
JavaScript
HTML / CSS

Author
Denuwan_Umayanaga


