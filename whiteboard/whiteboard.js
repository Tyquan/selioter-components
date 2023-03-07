function init()
{
    const colorInput = document.getElementById("colorInput");
    const sizeInput = document.getElementById("sizeInput");
    const clearWhiteBoardInput = document.getElementById("clearWhiteBoardInput");
    const instrumentSelector = document.getElementById("instrumentSelector");
    const whiteboardCanvas = document.getElementById("whiteboardCanvas");

    // Canvas Settings
    whiteboardCanvas.width = window.innerWidth; // full width
    whiteboardCanvas.height = window.innerHeight; // full height
    const context = whiteboardCanvas.getContext('2d');
    let drawing = false; // user starts off not drawing when the app starts


    function startDrawing() {
        // user is drawing
        drawing = true;
    }
    function stopDrawing() {
        // user is not drawing
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
        // update the canvas context with the inputted data
        // updates every frame
        context.strokeStyle = getStorageItem("selioterWhiteboardColor", colorInput.value);
        context.lineWidth = getStorageItem("selioterWhiteboardSize", sizeInput.value);
        context.lineCap = getStorageItem("selioterWhiteboardShape", instrumentSelector.value);
        context.lineTo(e.clientX, e.clientY);
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
    }

    function displayDrawing(e) {
        // shows context data to the screen
        if (!drawing) return;
        updateCanvasContext(e);
    }

    function clearWhiteboard(){
        // wipe the white board and start fresh
        whiteboardCanvas.width = whiteboardCanvas.width;
    }

    // initialize the data to be used
    colorInput.value = getStorageItem("selioterWhiteboardColor", "#000");
    sizeInput.value = getStorageItem("selioterWhiteboardSize", 10);
    instrumentSelector.value = getStorageItem('selioterWhiteboardShape', "round");

    // update the data whenever the user changes their drawing tool input
    colorInput.addEventListener('change', (e) => {
        setStorageItem("selioterWhiteboardColor", e.target.value);
    });
    sizeInput.addEventListener('change', (e) => {
        setStorageItem("selioterWhiteboardSize", e.target.value);
    });
    instrumentSelector.addEventListener('change', (e) => {
        setStorageItem("selioterWhiteboardShape", e.target.value);
    });

    // handle events whenever the mouse inputs data
    // if the use holds the left click down, allow drawing
    whiteboardCanvas.addEventListener("mousedown", startDrawing);
    // if the user moves the mouse while holding the left click draw the ink following the mouse
    whiteboardCanvas.addEventListener("mousemove", displayDrawing);
    // if the user releases the left click, disable drawing
    whiteboardCanvas.addEventListener("mouseup", stopDrawing);

    // if user clicks the clear button, clean the whiteboard
    clearWhiteBoardInput.addEventListener("click", clearWhiteboard);

    // run the animation every frame
    window.requestAnimationFrame(displayDrawing);
}

init();