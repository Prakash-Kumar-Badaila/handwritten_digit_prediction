# Handwritten Digit Recognition using Deep Learning

A handwritten digit recognition web application built using **Artificial Neural Networks (ANN), TensorFlow, FastAPI, HTML, CSS, and JavaScript**.

Draw a digit (0–9) on the canvas, submit it to the backend, and get the model's prediction with its confidence score.

## Project Demo

The application allows users to:
- Draw handwritten digits using a canvas.
- Clear the canvas and draw again.
- Send images to a FastAPI backend.
- Get predictions from a trained ANN model.
- View the predicted digit and confidence score.

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| TensorFlow / Keras | Deep Learning model |
| NumPy | Numerical operations |
| Pillow | Image processing |
| FastAPI | Backend API |
| HTML | Web structure |
| CSS | Styling |
| JavaScript | Frontend interactions |

## Model Architecture

The ANN model is trained using the MNIST handwritten digit dataset.

```python
model = Sequential()

model.add(Flatten(input_shape=(28, 28)))
model.add(Dense(128, activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(10, activation='softmax'))
```

**Architecture:**
- Input: 28 × 28 grayscale image
- Flatten layer
- Hidden layer: 128 neurons (ReLU)
- Hidden layer: 32 neurons (ReLU)
- Output layer: 10 neurons (Softmax)

The model predicts one of ten classes (0–9).

## Project Structure

```text
handwrittenDigitClassification/
│
├── main.py
├── mnist_model.keras
├── requirements.txt
├── README.md
│
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd handwrittenDigitClassification
```

### 2. Create a virtual environment

Python 3.12 is recommended.

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

### 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 4. Run the application

```bash
python -m uvicorn main:app --reload
```

### 5. Open the application

Visit:

```text
http://127.0.0.1:8000
```

**Important:** Open the application through the FastAPI URL rather than opening `index.html` directly or using a separate file URL.

API documentation:

```text
http://127.0.0.1:8000/docs
```

## API Endpoint

### POST `/predict`

Accepts a Base64-encoded image and returns the predicted digit and confidence score.

Example response:

```json
{
    "prediction": 7,
    "confidence": 98.45
}
```

## How It Works

1. The user draws a digit on the frontend canvas.
2. JavaScript converts the canvas image into Base64.
3. The image is sent to the FastAPI `/predict` endpoint.
4. The backend decodes and preprocesses the image.
5. The trained ANN model performs inference.
6. FastAPI returns the prediction and confidence.
7. JavaScript displays the result.

## Future Improvements

- Improve image preprocessing and digit centering.
- Increase prediction accuracy on real-world handwriting.
- Display probability scores for all ten digits.
- Improve the user interface and experience.
- Explore CNN-based handwritten digit classification.

## Learning Outcomes

Through this project, I explored:

- Fundamentals of Artificial Neural Networks.
- Image preprocessing using NumPy and Pillow.
- Saving and loading trained models.
- Building REST APIs using FastAPI.
- Connecting a Deep Learning model with a web frontend.
- Performing real-time model inference through an API.

---

**Author:** Prakash Kumar Badaila

Computer Engineering Student | AI/ML Enthusiast