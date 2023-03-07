function init()
{
    const colorInput = document.getElementById("colorInput");
    const sizeInput = document.getElementById("sizeInput");
    const clearWhiteBoardInput = document.getElementById("clearWhiteBoardInput");
    const instrumentSelector = document.getElementById("instrumentSelector");
    const whiteboardCanvas = document.getElementById("whiteboardCanvas");

    // Canvas Settings
    whiteboardCanvas.width = window.innerWidth;
    whiteboardCanvas.height = window.innerHeight;
    const context = whiteboardCanvas.getContext('2d');
    let drawing = false;


    function startDrawing() {
        drawing = true;
    }
    function stopDrawing() {
        drawing = false;
        context.beginPath();
    }

    function getStorageItem(storageName, inputValue) {
        // GET data from the loacal storage db
        return JSON.parse(localStorage.getItem(storageName))|| inputValue;
    }

    function setStorageItem(storageName, inputValue){
        // update local storage db with data
        localStorage.setItem(storageName, JSON.stringify(inputValue));
    }

    function updateCanvasContext(e) {
        context.strokeStyle = getStorageItem("selioterWhiteboardColor", colorInput.value);
        context.lineWidth = getStorageItem("selioterWhiteboardSize", sizeInput.value);
        context.lineCap = getStorageItem("selioterWhiteboardShape", instrumentSelector.value);
        context.lineTo(e.clientX, e.clientY);
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
    }

    function displayDrawing(e) {
        if (!drawing) return;
        updateCanvasContext(e);
    }

    function clearWhiteboard(){
        whiteboardCanvas.width = whiteboardCanvas.width;
    }

    colorInput.value = getStorageItem("selioterWhiteboardColor", "#000");
    sizeInput.value = getStorageItem("selioterWhiteboardSize", 10);
    instrumentSelector.value = getStorageItem('selioterWhiteboardShape', "round");

    colorInput.addEventListener('change', (e) => {
        setStorageItem("selioterWhiteboardColor", e.target.value);
    });
    sizeInput.addEventListener('change', (e) => {
        setStorageItem("selioterWhiteboardColor", e.target.value);
        localStorage.setItem("selioterWhiteboardSize", JSON.stringify(e.target.value));
    });
    instrumentSelector.addEventListener('change', (e) => {
        localStorage.setItem("selioterWhiteboardShape", JSON.stringify(e.target.value));
    });

    whiteboardCanvas.addEventListener("mousedown", startDrawing);
    whiteboardCanvas.addEventListener("mousemove", displayDrawing);
    whiteboardCanvas.addEventListener("mouseup", stopDrawing);

    clearWhiteBoardInput.addEventListener("click", clearWhiteboard);

    window.requestAnimationFrame(displayDrawing);
}

init();