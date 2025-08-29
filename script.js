// This script runs after the HTML document has been loaded, so we can access all elements.

// --- Heart Button Logic (Updated for all cards) ---
const heartIcons = document.querySelectorAll(".heart-icon");
const lifeButton = document.getElementById("life-button");

heartIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        let currentLife = parseInt(lifeButton.textContent);
        currentLife++;
        lifeButton.textContent = currentLife;
    });
});

// --- Call Button Logic (Implements user request) ---
// Select all call buttons using a common class.
const callButtons = document.querySelectorAll(".call-button");
const coinNumberSpan = document.querySelector("#coin-number span");
const callHistorySection = document.getElementById("Call-History");

callButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Find the parent card to get service details
        const card = this.closest('.shadow-md');
        const serviceName = card.querySelector('h2').textContent.trim();
        const serviceNumber = card.querySelector('h1').textContent.trim();

        let currentCoins = parseInt(coinNumberSpan.textContent);

        if (currentCoins >= 20) {
            // Show alert. The script will pause here until the user clicks OK.
            alert(`Calling ${serviceName}: ${serviceNumber}`);

            // Deduct coins
            currentCoins -= 20;
            coinNumberSpan.textContent = currentCoins;

            // Get current time
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });

            // Create the new history item
            const historyEntry = document.createElement("div");
            historyEntry.className = "bg-[#FAFAFA] border-none border-gray-200 rounded-lg p-3 mt-2";
            historyEntry.innerHTML = `
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-sm font-medium text-gray-700">${serviceName}</div>
                  <div class="text-2xl font-bold text-gray-900">${serviceNumber}</div>
                </div>
                <div class="text-sm text-gray-500">${timeString}</div>
              </div>
            `;

            // Add the new item to the call history
            callHistorySection.appendChild(historyEntry);

        } else {
            alert("Not enough coins! You need at least 20 coins to make a call.");
        }
    });
});

// --- Copy Button Logic ---
const copyButtons = document.querySelectorAll(".copy-button");
const copyCountSpan = document.getElementById("copy-count");

copyButtons.forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest('.shadow-md');
        const serviceNumber = card.querySelector('h1').textContent.trim();

        navigator.clipboard.writeText(serviceNumber).then(() => {
            // Success!
            alert(`Copied "${serviceNumber}" to clipboard.`);

            let currentCount = parseInt(copyCountSpan.textContent);
            currentCount++;
            copyCountSpan.textContent = `${currentCount} Copy`; // Update the text

        }).catch(err => {
            // Error
            console.error('Failed to copy text: ', err);
            alert('Failed to copy number. See console for details.');
        });
    });
});