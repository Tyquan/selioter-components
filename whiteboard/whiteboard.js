function init()
{
    const whiteboardCanvas = document.getElementById("whiteboardCanvas");
    const colorInput = document.getElementById("colorInput");
    const sizeInput = document.getElementById("sizeInput");
    const clearWhiteBoardInput = document.getElementById("clearWhiteBoardInput");
    const instrumentSelector = document.getElementById("instrumentSelector");

    let drawing = false;

    whiteboardCanvas.width = window.innerWidth;
    whiteboardCanvas.height = window.innerHeight;

    colorInput.value = JSON.parse(localStorage.getItem("selioterWhiteboardColor"));
    sizeInput.value = JSON.parse(localStorage.getItem("selioterWhiteboardSize"));
    instrumentSelector.value = JSON.parse(localStorage.getItem('selioterWhiteboardShape'));

    const context = whiteboardCanvas.getContext('2d');

    colorInput.addEventListener('change', (e) => {
        localStorage.setItem("selioterWhiteboardColor", JSON.stringify(e.target.value));
    });
    sizeInput.addEventListener('change', (e) => {
        localStorage.setItem("selioterWhiteboardSize", JSON.stringify(e.target.value));
    });
    instrumentSelector.addEventListener('change', (e) => {
        localStorage.setItem("selioterWhiteboardShape", JSON.stringify(e.target.value));
    });

    function startDrawing() {
        drawing = true;
    }
    function stopDrawing() {
        drawing = false;
        context.beginPath();
    }
    function displayDrawing(e) {
        if (!drawing) return;
        context.strokeStyle =  JSON.parse(localStorage.getItem("selioterWhiteboardColor"))|| colorInput.value;
        context.lineWidth =  JSON.parse(localStorage.getItem("selioterWhiteboardSize"))|| sizeInput.value;
        context.lineCap = JSON.parse(localStorage.getItem("selioterWhiteboardShape"))|| instrumentSelector.value;
        context.lineTo(e.clientX, e.clientY);
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
    }

    function clearWhiteboard(){
        whiteboardCanvas.width = whiteboardCanvas.width;
    }

    whiteboardCanvas.addEventListener("mousedown", startDrawing);
    whiteboardCanvas.addEventListener("mouseup", stopDrawing);
    whiteboardCanvas.addEventListener("mousemove", displayDrawing);

    clearWhiteBoardInput.addEventListener("click", clearWhiteboard);

    window.requestAnimationFrame(displayDrawing);
}

init();