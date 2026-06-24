let currentMatch = "";

// Open the form when a match is clicked
function openForm(matchName) {
    currentMatch = matchName;
    document.getElementById('match-title').innerText = "Predicting: " + matchName;
    document.getElementById('form-modal').style.display = "block";
    document.getElementById('statusMessage').innerText = "";
    
    // Smooth scroll down to the form
    document.getElementById('form-modal').scrollIntoView({ behavior: 'smooth' });
}

// Handle the submission
document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('statusMessage').innerText = "Sending to Google Sheets...";

    const data = {
        match: currentMatch,
        name: document.getElementById('playerName').value,
        winner: document.getElementById('predictedWinner').value,
        score: document.getElementById('predictedScore').value
    };

    // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const webAppUrl = "https://script.google.com/macros/s/AKfycbwBhvmINsRid6kYqpPU_jKzMPHd2N9TBKxBtRl63IDLRVUfbkpQ7MHlr24tFoLnC1BxfQ/exec";

    fetch(webAppUrl, {
        method: 'POST',
        // 'no-cors' mode is sometimes needed depending on Google Script permissions, 
        // but try it without first. If it fails, uncomment the mode below.
        // mode: 'no-cors',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        }
    })
    .then(response => {
        document.getElementById('statusMessage').innerText = "✅ Entry Saved!";
        document.getElementById('predictionForm').reset();
        
        // Hide the form after 2 seconds
        setTimeout(() => { 
            document.getElementById('form-modal').style.display = "none"; 
        }, 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById('statusMessage').innerText = "❌ Error saving entry. Check console.";
    });
});