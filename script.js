let player = { type: '', xp: 0, funding: 0, compliance: 0 };
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function startGame(type) {
    player.type = type;
    document.getElementById('landing').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

function openAct(act) {
    document.getElementById('map').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    loadScenario(act);
}

function loadScenario(act) {
    let scenarios = {
        1: { title: 'Design Control Challenge', text: 'Your device failed usability testing. What do you do?', options: ['Redo usability study', 'Ignore and proceed', 'Update risk analysis'] },
        2: { title: 'Regulatory Pathway', text: 'You must choose a submission route for a novel device.', options: ['510(k)', 'PMA', 'De Novo'] },
        3: { title: 'Clinical Trials', text: 'Phase II trial shows unexpected adverse events. Next step?', options: ['Pause trial and investigate', 'Continue as planned', 'Submit safety report'] },
        4: { title: 'Submission Review', text: 'FDA requests additional data during review.', options: ['Provide data promptly', 'Argue against request', 'Withdraw submission'] },
        5: { title: 'Boss Battle', text: 'Defend your risk management strategy before the Advisory Committee.', options: ['Present FMEA results', 'Blame supplier', 'Offer CAPA plan'] }
    };

    let scenario = scenarios[act];
    document.getElementById('challenge-title').innerText = scenario.title;
    document.getElementById('scenario').innerText = scenario.text;
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    scenario.options.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => completeChallenge(opt);
        optionsDiv.appendChild(btn);
    });
}

function completeChallenge(choice) {
    player.xp += 10;
    player.funding += 5;
    player.compliance += 5;
    alert('Challenge complete! XP: ' + player.xp);
    leaderboard.push({ type: player.type, score: player.xp });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    showLeaderboard();
}

function showLeaderboard() {
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    let scoresList = document.getElementById('scores');
    scoresList.innerHTML = '';
    leaderboard.sort((a,b) => b.score - a.score);
    leaderboard.forEach(entry => {
        let li = document.createElement('li');
        li.innerText = entry.type + ': ' + entry.score;
        scoresList.appendChild(li);
    });
}
