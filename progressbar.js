const totalKey = "total";
const progressKey = "progress";
const barColorKey = "barColor"

document.addEventListener("DOMContentLoaded", function () {
    let total = parseInt(localStorage.getItem(totalKey)) || 1;
    let progress = parseInt(localStorage.getItem(progressKey)) || 0;
    let barColor = localStorage.getItem(barColorKey) || "#4CAF50"
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const countDisplay = document.getElementById("count-display");
    const totalInput = document.getElementById("total-input");
    const contextMenu = document.getElementById("context-menu");
    const barColorPicker = document.getElementById("bar-color-picker");

    const updateProgressBar = () => {
        const progressPercentage = (progress / total) * 100;
        progressBar.style.width = progressPercentage + "%";
    }

    const updateCountDisplay = () => {
        countDisplay.textContent = progress + " / " + total;
    }

    const updateBarColor = () => progressBar.style.backgroundColor = barColor;

    const resetProgress = () => {
        const userInput = totalInput.value.trim();
        const newTotal = parseInt(userInput);

        // Initialize only when user modified input value
        if (!isNaN(newTotal) && newTotal > 0 && newTotal !== total) {
            total = newTotal;
            localStorage.setItem(totalKey, total);
            progress = 0;
            localStorage.setItem(progressKey, progress);
            totalInput.value = total;
            updateProgressBar();
            updateCountDisplay();
        }
    }

    const resetBarColor = () => {
        barColor = barColorPicker.value = "#4CAF50";
        localStorage.setItem(barColorKey, barColor);
        updateBarColor();
    }

    const decreaseProgress = () => {
        if (progress > 0) {
            progress--;
            localStorage.setItem(progressKey, progress);
            updateProgressBar();
            updateCountDisplay();
        }
    }

    const increaseProgress = () => {
        if (progress < total) {
            progress++;
            localStorage.setItem(progressKey, progress);
            updateProgressBar();
            updateCountDisplay();
        }
    }

    const handleClick = (event) => {
        const clickPosition = event.clientX - progressContainer.offsetLeft;
        const third = progressContainer.clientWidth / 3;

        if (clickPosition < third) {
            // click left of the progress bar
            decreaseProgress();
        } else if (clickPosition > 2 * third) {
            // click right of the progress bar
            increaseProgress();
        } else {
            // click middle of the progress bar
            totalInput.style.display = "block";
            totalInput.focus();
        }
    }

    const handleRightClick = (event) => {
        event.preventDefault(); // prevent default right click menu
        contextMenu.style.display = "block";
        contextMenu.style.left = event.pageX + "px";
        contextMenu.style.top = event.pageY + "px";
    }

    const handlBarColor = () => {
        barColor = barColorPicker.value;
        localStorage.setItem(barColorKey, barColor);
        updateBarColor();
    }

    // Attach event listeners
    progressContainer.addEventListener("click", handleClick);
    progressContainer.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("click", (event) => contextMenu.style.display = "none");
    totalInput.addEventListener("blur", function () {
        resetProgress();
        this.style.display = "none";
    });
    document.getElementById("reset-progress").addEventListener("click", () => {
        progress = 0;
        localStorage.setItem(progressKey, progress);
        updateProgressBar();
        updateCountDisplay();
    })
    barColorPicker.addEventListener("change", handlBarColor);
    document.getElementById("bar-color-reset-btn").addEventListener("click", resetBarColor)

    // Initialize display
    updateProgressBar();
    updateCountDisplay();
    updateBarColor();
    barColorPicker.value = barColor;
});