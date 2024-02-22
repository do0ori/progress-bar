const TOTAL_KEY = "total";
const PROGRESS_KEY = "progress";
const BAR_COLOR_KEY = "barColor";

document.addEventListener("DOMContentLoaded", function () {
    let total = parseInt(localStorage.getItem(TOTAL_KEY)) || 1;
    let progress = parseInt(localStorage.getItem(PROGRESS_KEY)) || 0;
    let barColor = localStorage.getItem(BAR_COLOR_KEY) || "#4CAF50";
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const countDisplay = document.getElementById("count-display");
    const totalInput = document.getElementById("total-input");
    const contextMenu = document.getElementById("context-menu");
    const barColorPicker = document.getElementById("bar-color-picker");

    const updateProgressBar = () => {
        const progressPercentage = (progress / total) * 100;
        progressBar.style.width = progressPercentage + "%";
    };

    const updateCountDisplay = () => {
        countDisplay.textContent = progress + " / " + total;
    };

    const updateBarColor = () => progressBar.style.backgroundColor = barColor;

    const resetProgress = () => {
        updateProgressBar();
        updateCountDisplay();
    };

    const setTotal = () => {
        const newTotal = parseInt(totalInput.value.trim());

        if (!isNaN(newTotal) && newTotal > 0 && newTotal !== total) {
            total = newTotal;
            localStorage.setItem(TOTAL_KEY, total);
            totalInput.value = total;
            resetProgress();
        }
    };

    const resetBarColor = () => {
        barColor = barColorPicker.value = "#4CAF50";
        localStorage.setItem(BAR_COLOR_KEY, barColor);
        updateBarColor();
    };

    const decreaseProgress = () => {
        if (progress > 0) {
            progress--;
            localStorage.setItem(PROGRESS_KEY, progress);
            resetProgress();
        }
    };

    const increaseProgress = () => {
        if (progress < total) {
            progress++;
            localStorage.setItem(PROGRESS_KEY, progress);
            resetProgress();
        }
    };

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
    };

    const handleRightClick = (event) => {
        event.preventDefault(); // prevent default right click menu
        contextMenu.style.display = "block";
        contextMenu.style.left = event.pageX + "px";
        contextMenu.style.top = event.pageY + "px";
    };

    const handlBarColor = () => {
        barColor = barColorPicker.value;
        localStorage.setItem(BAR_COLOR_KEY, barColor);
        updateBarColor();
    };

    // Attach event listeners
    progressContainer.addEventListener("click", handleClick);
    progressContainer.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("click", (event) => contextMenu.style.display = "none");
    totalInput.addEventListener("blur", function () {
        setTotal();
        this.style.display = "none";
    });
    document.getElementById("reset-progress").addEventListener("click", () => {
        progress = 0;
        localStorage.setItem(PROGRESS_KEY, progress);
        resetProgress();
    });
    barColorPicker.addEventListener("change", handlBarColor);
    document.getElementById("bar-color-reset-btn").addEventListener("click", resetBarColor);

    // Initialize display
    resetProgress();
    updateBarColor();
    barColorPicker.value = barColor;
});