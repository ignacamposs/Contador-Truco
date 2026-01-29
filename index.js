function increment(team) {
    const teamInput = document.getElementById(team);
    teamInput.value = parseInt(teamInput.value) + 1;
}

function decrement(team) {
    const teamInput = document.getElementById(team);
    teamInput.value = parseInt(teamInput.value) - 1;
    if (teamInput.value < 0) {
        teamInput.value = 0;
    }
}

function reset() {
    document.getElementById("team1").value = 0;
    document.getElementById("team2").value = 0;
}

