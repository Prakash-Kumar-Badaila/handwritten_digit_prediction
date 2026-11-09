
import base64
import io

import numpy as np
import tensorflow as tf

from PIL import Image
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# Initialize FastAPI
app = FastAPI(title="Handwritten Digit Recognition API")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:8000",
        "http://localhost:8000"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model once
model = tf.keras.models.load_model("mnist_model.keras")


# Request schema
class ImageRequest(BaseModel):
    image: str


# Serve frontend
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def home():
    return FileResponse("static/index.html")


@app.get("/health")
def health():
    return {"status": "API is running"}


@app.post("/predict")
def predict_digit(data: ImageRequest):

    try:
        # Decode Base64 image
        image_data = data.image.split(",")[-1]
        image_bytes = base64.b64decode(image_data)

        # Open and preprocess image
        image = Image.open(io.BytesIO(image_bytes))
        image = image.convert("L")
        image = image.resize((28, 28))

        image_array = np.array(image, dtype=np.float32)
        image_array = image_array / 255.0

        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)

        # Predict
        probabilities = model.predict(image_array, verbose=0)

        prediction = int(np.argmax(probabilities[0]))
        confidence = float(np.max(probabilities[0])) * 100

        return {
            "prediction": prediction,
            "confidence": round(confidence, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
