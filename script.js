let player = { name: '', type: '', xp: 0, funding: 0, compliance: 0, submissionType: '' };
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let scenarioIndex = 0;
let currentScenarios = [];
let chosenOption = '';

const submissionOptions = {
    'Device': ['Exempt', '510(k)', 'PMA'],
    'Drug': ['NDA', 'ANDA'],
    'Biologic': ['BLA']
};

const acts = ['Design Inputs', 'Regulatory Pathway', 'Clinical Trials', 'Submission and Review', 'Post-market'];

const scenarios = {
    'Device': [
        'Perform risk analysis (ISO 14971)', 'Create Design History File', 'Conduct usability testing',
        'Choose correct submission route', 'Prepare 510(k) summary', 'Verify labeling compliance',
        'Plan clinical evaluation', 'Handle adverse events', 'Validate sterilization',
        'Respond to FDA queries', 'Prepare eCTD', 'Ensure CAPA readiness',
        'Manage MDR reporting', 'Conduct post-market surveillance', 'Handle recalls'
    ],
    'Drug': [
        'Develop preclinical study plan', 'Ensure GCP compliance', 'Prepare IND',
        'Select NDA or ANDA', 'Prepare labeling', 'Plan bioequivalence study',
        'Conduct Phase I trial', 'Handle adverse events', 'Prepare statistical analysis',
        'Submit NDA', 'Respond to FDA review', 'Prepare Advisory Committee briefing',
        'Monitor pharmacovigilance', 'Submit periodic safety reports', 'Handle recalls'
    ],
    'Biologic': [
        'Develop cell line characterization', 'Prepare BLA strategy', 'Ensure GMP compliance',
        'Select BLA pathway', 'Prepare labeling', 'Plan comparability study',
        'Conduct Phase I trial', 'Handle immunogenicity issues', 'Prepare statistical analysis',
        'Submit BLA', 'Respond to FDA review', 'Prepare Advisory Committee briefing',
        'Monitor post-market safety', 'Submit periodic safety reports', 'Handle recalls'
    ]
};

const badChoices = [
    'Conduct espionage', 'Bribe an auditor', 'Destroy competitor data', 'Fake clinical results', 'Hack FDA database',
    'Sabotage rival trials', 'Forge ISO certificate', 'Hide adverse events', 'Tamper with labeling', 'Pay off reviewers'
];

const bosses = [
    'Boss 1: ISO Auditor',
    'Boss 2: FDA Reviewer',
    'Boss 3: Risk Council',
    'Boss 4: Advisory Committee',
    'Boss 5: Post-market Audit'
];

const bossOptions = [
    { text: 'Comply fully with regulations', cost: 20, reward: { xp: 30, compliance: 20 } },
    { text: 'Hire a consultant', cost: 12, reward: { xp: 20, compliance: 15 } },
    { text: 'Ignore regulatory meeting', cost: 6, reward: { xp: 5, compliance: 2 } }
];

function chooseType(type) {
    player.name = document.getElementById('player-name').value.trim() || 'Anonymous';
    player.type = type;
    document.getElementById('landing').style.display = 'none';
    document.getElementById('submission-title').innerText = 'Choose your submission type:';
    let optionsDiv = document.getElementById('submission-options');
    optionsDiv.innerHTML = '';
    submissionOptions[type].forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => startGame(opt);
        optionsDiv.appendChild(btn);
    });
    document.getElementById('submission-choice').style.display = 'block';
}

function startGame(submissionType) {
    player.submissionType = submissionType;
    player.funding = 30; // Starting funding
    document.getElementById('submission-choice').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    currentScenarios = scenarios[player.type];
    loadScenario();
}

function loadScenario() {
    if (scenarioIndex >= currentScenarios.length) {
        endGame();
        return;
    }
    document.getElementById('challenge-title').innerText = acts[Math.floor(scenarioIndex / 3)] + ' Phase ' + ((scenarioIndex % 3) + 1);
    document.getElementById('scenario').innerText = 'Scenario: ' + currentScenarios[scenarioIndex];
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = `<p>Options:</p><p>1) ${currentScenarios[scenarioIndex]}</p><p>2) Do nothing</p><p>3) ${badChoices[scenarioIndex % badChoices.length]}</p>`;
    document.getElementById('dice-result').innerText = '';
    document.getElementById('dice-animation').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    updateStats();
    updateProgress();
}

function rollDice() {
    document.getElementById('dice-animation').style.display = 'block';
    setTimeout(() => {
        document.getElementById('dice-animation').style.display = 'none';
        let roll = Math.floor(Math.random() * 6) + 1;
        let choiceIndex;
        if (roll === 1 || roll === 4) choiceIndex = 2; // bad
        else if (roll === 2 || roll === 5) choiceIndex = 1; // neutral
        else choiceIndex = 0; // good
        chosenOption = choiceIndex === 0 ? currentScenarios[scenarioIndex] : (choiceIndex === 1 ? 'Do nothing' : badChoices[scenarioIndex % badChoices.length]);
        document.getElementById('dice-result').innerText = `You rolled a ${roll}. Decision: ${chosenOption}`;
        applyChoice(choiceIndex);
        document.getElementById('next-button').style.display = 'inline-block';
    }, 1500);
}

function applyChoice(choiceIndex) {
    if (choiceIndex === 0) {
        player.xp += 15;
        player.funding += 10;
        player.compliance += 10;
    } else if (choiceIndex === 1) {
        player.xp += 10;
        player.funding += 5;
        player.compliance += 5;
    } else {
        player.xp += 5;
        player.funding += 2;
        player.compliance += 2;
    }
}

function nextScenario() {
    scenarioIndex++;
    if (scenarioIndex % 3 === 0 && scenarioIndex <= currentScenarios.length) {
        startBossPhase(Math.floor(scenarioIndex / 3));
    } else {
        loadScenario();
    }
}

function startBossPhase(bossIndex) {
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('boss-phase').style.display = 'block';
    document.getElementById('boss-title').innerText = bosses[bossIndex - 1];
    let bossOptionsDiv = document.getElementById('boss-options');
    bossOptionsDiv.innerHTML = '';
    bossOptions.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = `${opt.text} (Cost: ${opt.cost})`;
        btn.onclick = () => chooseBossOption(opt);
        bossOptionsDiv.appendChild(btn);
    });
    updateBossStats();
}

function chooseBossOption(option) {
    if (player.funding >= option.cost) {
        player.funding -= option.cost;
        player.xp += option.reward.xp;
        player.compliance += option.reward.compliance;
    } else {
        alert('Not enough funding for this option!');
        return;
    }
    document.getElementById('boss-phase').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    loadScenario();
}

function updateStats() {
    document.getElementById('stats').innerText = `Player: ${player.name} | XP: ${player.xp} | Funding: ${player.funding} | Compliance: ${player.compliance}`;
}

function updateBossStats() {
    document.getElementById('stats-boss').innerText = `Player: ${player.name} | XP: ${player.xp} | Funding: ${player.funding} | Compliance: ${player.compliance}`;
}

function updateProgress() {
    let progressPercent = ((scenarioIndex) / currentScenarios.length) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
}

function endGame() {
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('boss-phase').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    leaderboard.push({ name: player.name, type: player.type, score: player.xp, funding: player.funding, compliance: player.compliance });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    let scoresList = document.getElementById('scores');
    scoresList.innerHTML = '';
    leaderboard.sort((a,b) => b.score - a.score);
    leaderboard.forEach(entry => {
        let li = document.createElement('li');
        li.innerText = `${entry.name} (${entry.type}) - XP: ${entry.score}, Funding: ${entry.funding}, Compliance: ${entry.compliance}`;
        scoresList.appendChild(li);
    });
}

function resetLeaderboard() {
    localStorage.removeItem('leaderboard');
    leaderboard = [];
    displayLeaderboard();
}
