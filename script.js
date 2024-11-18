function updateCountdown() {
    const tableBody = document.querySelector("#countdown-table tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const currentTime = new Date();
    const expiredRows = [];

    rows.forEach(row => {
        const dateCell = row.children[1]; // 2nd column: Date
        const timeCell = row.children[2]; // 3rd column: Time
        const countdownCell = row.children[3]; // 4th column: Countdown

        // Get the test date and time
        const testDateTime = new Date(`${dateCell.textContent} ${timeCell.textContent}`);

        // Calculate the difference
        const timeDifference = testDateTime - currentTime;

        if (timeDifference > 0) {
            // Convert difference to days, hours, minutes
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            // Display the countdown
            countdownCell.textContent = `${days}d ${hours}h ${minutes}m`;
            row.classList.remove("expired"); // Remove expired class if previously added
        } else {
            // If the test time has passed
            countdownCell.textContent = "Expired";
            row.classList.add("expired"); // Add expired class for red styling

            // Add the expired row to the array for moving
            expiredRows.push(row);
        }
    });

    // Move expired rows to the end of the table
    expiredRows.forEach(row => {
        tableBody.appendChild(row);
    });
}

// Update the countdown every minute
setInterval(updateCountdown, 60000);

// Run the countdown immediately on load
updateCountdown();
