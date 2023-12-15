const totalKey = "total";
const progressKey = "progress";

document.addEventListener("DOMContentLoaded", function () {
    let total = parseInt(localStorage.getItem(totalKey)) || 1;
    let progress = parseInt(localStorage.getItem(progressKey)) || 0;

    const updateProgressBar = () => {
        const progressBar = document.getElementById("progress-bar");
        const progressPercentage = (progress / total) * 100;
        progressBar.style.width = progressPercentage + "%";
    }

    const updateCountDisplay = () => {
        const countDisplay = document.getElementById("count-display");
        countDisplay.textContent = progress + " / " + total;
    }

    const resetProgress = () => {
        const totalInput = document.getElementById("total-input");
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
        const progressContainer = document.getElementById("progress-container");
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
            const totalInput = document.getElementById("total-input");
            totalInput.style.display = "block";
            totalInput.focus();
        }
    }

    // Attach event listeners
    document.getElementById("progress-container").addEventListener("click", handleClick);
    document.getElementById("total-input").addEventListener("blur", function () {
        resetProgress();
        this.style.display = "none";
    });

    // Initialize display
    updateProgressBar();
    updateCountDisplay();
});