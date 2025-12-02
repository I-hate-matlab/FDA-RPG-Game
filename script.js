let player = { type: '', xp: 0, funding: 0, compliance: 0 };
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let currentAct = 1;
let phase = 'act'; // 'act' or 'boss'

const acts = [
    { name: 'Design Inputs', scenario: 'Your device failed usability testing. What do you do?', options: ['Redo usability study', 'Ignore and proceed', 'Update risk analysis'] },
    { name: 'Regulatory Pathway', scenario: 'You must choose a submission route for a novel device.', options: ['510(k)', 'PMA', 'De Novo'] },
    { name: 'Clinical Trials', scenario: 'Phase II trial shows unexpected adverse events. Next step?', options: ['Pause trial and investigate', 'Continue as planned', 'Submit safety report'] },
    { name: 'Submission and Review', scenario: 'FDA requests additional data during review.', options: ['Provide data promptly', 'Argue against request', 'Withdraw submission'] },
    { name: 'Post-market', scenario: 'A serious adverse event occurs post-market. What is your first action?', options: ['File MDR report', 'Ignore and monitor', 'Recall product'] }
];

const bosses = [
    { name: 'Boss 1: ISO Auditor', scenario: 'Defend your ISO 13485 compliance strategy.', options: ['Show QMS documentation', 'Blame supplier', 'Offer CAPA plan'] },
    { name: 'Boss 2: FDA Reviewer', scenario: 'Defend your regulatory pathway choice.', options: ['Provide justification', 'Argue aggressively', 'Offer alternative route'] },
    { name: 'Boss 3: Risk Council', scenario: 'Present your FMEA results under time pressure.', options: ['Show risk matrix', 'Skip details', 'Blame design team'] },
    { name: 'Boss 4: Advisory Committee', scenario: 'Defend your clinical trial data.', options: ['Show statistical analysis', 'Hide negative results', 'Offer new trial'] },
    { name: 'Boss 5: Post-market Audit', scenario: 'Respond to CAPA investigation.', options: ['Provide CAPA plan', 'Delay response', 'Ignore request'] }
];

function startGame(type) {
    player.type = type;
    document.getElementById('landing').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    loadScenario();
}

function loadScenario() {
    let scenarioObj;
    if (phase === 'act') {
        scenarioObj = acts[currentAct - 1];
        document.getElementById('challenge-title').innerText = scenarioObj.name;
    } else {
        scenarioObj = bosses[currentAct - 1];
        document.getElementById('challenge-title').innerText = scenarioObj.name;
    }
    document.getElementById('scenario').innerText = scenarioObj.scenario;
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    scenarioObj.options.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => completeChallenge();
        optionsDiv.appendChild(btn);
    });
}

function completeChallenge() {
    player.xp += 10;
    player.funding += 5;
    player.compliance += 5;
    if (phase === 'act') {
        phase = 'boss';
    } else {
        currentAct++;
        phase = 'act';
    }
    if (currentAct > acts.length) {
        endGame();
    } else {
        loadScenario();
    }
}

function endGame() {
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    leaderboard.push({ type: player.type, score: player.xp });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    let scoresList = document.getElementById('scores');
    scoresList.innerHTML = '';
    leaderboard.sort((a,b) => b.score - a.score);
    leaderboard.forEach(entry => {
        let li = document.createElement('li');
        li.innerText = entry.type + ': ' + entry.score;
        scoresList.appendChild(li);
    });
}
