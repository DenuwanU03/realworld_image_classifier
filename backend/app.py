from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from pathlib import Path

app = FastAPI()

# Allow React dev server (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "cats_vs_dogs_mobilenetv2.keras"
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess(image: Image.Image):
    image = image.convert("RGB").resize((224, 224))
    x = np.array(image, dtype=np.float32)
    x = np.expand_dims(x, axis=0)  # (1,224,224,3)
    return x

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    content = await file.read()
    image = Image.open(io.BytesIO(content))
    x = preprocess(image)

    prob = float(model.predict(x, verbose=0)[0][0])  # sigmoid output
    label = "dog" if prob >= 0.5 else "cat"

    return {"label": label, "dog_probability": prob}
