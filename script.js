// Store participant number and data
let participantNumber = Math.floor(Math.random() * 1000);  // Random participant ID (for simplicity)
let contribution = 0;
let punishmentBudget = 10;
let totalPunishment = 0;
let punishmentGiven = 0;
let publicGoodPayoff = 0;
let finalPayoff = 0;
let neighbors = {
    prev: {
        contribution: 0,
        punished: false,
        punishmentReceived: 0
    },
    next: {
        contribution: 0,
        punished: false,
        punishmentReceived: 0
    }
};

function updateSurveyResults() {
    // Display data
    document.getElementById("participantID").innerText = participantNumber;
    document.getElementById("contribution").innerText = contribution;
    document.getElementById("publicGoodPayoff").innerText = publicGoodPayoff;
    document.getElementById("punishmentBudget").innerText = punishmentBudget;
    document.getElementById("punishmentGiven").innerText = punishmentGiven;

    // Calculate and display final payoff
    finalPayoff = 20 - contribution + publicGoodPayoff + punishmentBudget - (2 * punishmentGiven);
    document.getElementById("finalPayoff").innerText = finalPayoff;
}

// Handle contribution decision
function handleContribution() {
    contribution = parseFloat(document.getElementById("contributionAmount").value);
    publicGoodPayoff = (contribution + neighbors.prev.contribution + neighbors.next.contribution) / 10;
    document.getElementById("publicGoodPayoffDisplay").innerText = publicGoodPayoff;
    document.getElementById("punishmentOptions").style.display = "block";  // Show punishment options
}

// Handle punishment decision
function handlePunishment() {
    let punishedNeighbor = document.querySelector('input[name="punishmentNeighbor"]:checked');
    if (punishedNeighbor) {
        let punishmentAmount = parseFloat(document.getElementById("punishmentAmount").value);
        if (punishmentAmount <= punishmentBudget) {
            punishmentGiven = punishmentAmount;
            punishmentBudget -= punishmentAmount;
            totalPunishment += punishmentAmount;
            punishedNeighbor.parentNode.querySelector(".punishedAmount").innerText = punishmentAmount;
            updateSurveyResults();
        }
    } else {
        alert("Please select a neighbor to punish.");
    }
}

// Show final results
function showFinalResults() {
    let resultsSection = document.getElementById("results");
    resultsSection.style.display = "block";
    updateSurveyResults();
}

// Trigger event after clicking "Next" to go to the next round (can be improved)
function goToNextRound() {
    // Reset variables for the next round (if needed)
    punishmentBudget = 10;
    punishmentGiven = 0;
    neighbors.prev.punished = false;
    neighbors.next.punished = false;
    document.getElementById("punishmentOptions").style.display = "none";
    document.getElementById("results").style.display = "none";  // Hide results until next round
}
