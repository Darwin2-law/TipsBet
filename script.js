// script.js
document.getElementById('predictionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const teamA = document.getElementById('teamA').value.trim();
    const teamB = document.getElementById('teamB').value.trim();

    if (!teamA || !teamB) {
        displayResult('Please enter valid team names.');
        return;
    }

    // Generate random metrics for demonstration (replace with real data if available)
    const teamAMetrics = generateRandomMetrics();
    const teamBMetrics = generateRandomMetrics();

    // Determine the winner
    const teamAScore = teamAMetrics.reduce((a, b) => a + b, 0);
    const teamBScore = teamBMetrics.reduce((a, b) => a + b, 0);

    let winnerMessage = '';
    if (teamAScore > teamBScore) {
        winnerMessage = `🏆 Winner: ${teamA}`;
    } else if (teamBScore > teamAScore) {
        winnerMessage = `🏆 Winner: ${teamB}`;
    } else {
        winnerMessage = '🤝 It\'s a tie!';
    }

    displayResult(winnerMessage);

    // Update Radar Chart
    updateRadarChart(teamA, teamB, teamAMetrics, teamBMetrics);
    document.getElementById('chart-container').classList.remove('hidden');
});

// Display Result
function displayResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
}

// Generate random metrics for demonstration
function generateRandomMetrics() {
    return [
        Math.random() * 100, // Attack
        Math.random() * 100, // Defense
        Math.random() * 100, // Stamina
        Math.random() * 100, // Strategy
        Math.random() * 100  // Recent Form
    ];
}

// Radar Chart Initialization
const ctx = document.getElementById('radarChart').getContext('2d');
let radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Attack', 'Defense', 'Stamina', 'Strategy', 'Recent Form'],
        datasets: [] // Empty datasets initially
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        },
        scales: {
            r: {
                angleLines: { color: '#fff' },
                grid: { color: '#aaa' },
                pointLabels: { color: '#fff' },
                ticks: {
                    color: '#fff',
                    backdropColor: 'transparent',
                }
            }
        }
    }
});

// Update Radar Chart with new data
function updateRadarChart(teamA, teamB, teamAMetrics, teamBMetrics) {
    radarChart.data.datasets = [
        {
            label: teamA,
            data: teamAMetrics,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: teamB,
            data: teamBMetrics,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        }
    ];
    radarChart.update();
}
