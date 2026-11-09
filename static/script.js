
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const predictBtn = document.getElementById("predictBtn");
const clearBtn = document.getElementById("clearBtn");

const prediction = document.getElementById("prediction");
const confidence = document.getElementById("confidence");

let drawing = false;


// Initialize canvas
function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    prediction.innerText = "?";
    confidence.innerText = "Draw something to get started.";
}

clearCanvas();


// Drawing settings
ctx.strokeStyle = "white";
ctx.lineWidth = 18;
ctx.lineCap = "round";
ctx.lineJoin = "round";


// Get drawing position
function getPosition(event) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: (event.clientX - rect.left) *
            (canvas.width / rect.width),

        y: (event.clientY - rect.top) *
            (canvas.height / rect.height)
    };
}


// Start drawing
canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);

    const pos = getPosition(event);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});


// Draw
canvas.addEventListener("pointermove", (event) => {
    if (!drawing) return;

    const pos = getPosition(event);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
});


// Stop drawing
canvas.addEventListener("pointerup", () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener("pointercancel", () => {
    drawing = false;
    ctx.beginPath();
});


// Clear button
clearBtn.addEventListener("click", clearCanvas);


// Predict button
predictBtn.addEventListener("click", async () => {

    const image = canvas.toDataURL("image/png");

    prediction.innerText = "...";
    confidence.innerText = "Predicting...";

    predictBtn.disabled = true;

    try {

        // Automatically use the same server as the frontend
        const API_URL = `${window.location.protocol}//${window.location.hostname}:8000/predict`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: image })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Prediction failed");
        }

        prediction.innerText = data.prediction;

        confidence.innerText =
            `Confidence: ${data.confidence}%`;

    } catch (error) {

        prediction.innerText = "!";
        confidence.innerText = error.message;

        console.error("Prediction error:", error);

    } finally {
        predictBtn.disabled = false;
    }
});
