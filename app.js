const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save");
const fileInput = document.getElementById("file-input");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(e) {
    if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(e) {
    ctx.lineWidth = e.target.value;
}

function changColor(data) {
    ctx.strokeStyle = data;
    ctx.fillStyle = data;
}

function onColorChange(e) {
    changColor(e.target.value);
}

function onColorClick(e) {
    const colorVal = e.target.dataset.color;
    changColor(colorVal);
    color.value = colorVal;
}

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "그리기";
    } else {
        isFilling = true;
        modeBtn.innerText = "채우기";
    }
}
function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserlick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    onCanvasClick();
}

function onFileChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserlick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);