let player = { name: '', type: '', xp: 0, funding: 0, compliance: 0, submissionType: '', comboClasses: [] };
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let scenarioIndex = 0;
let currentScenarios = [];
let actScenarioCounts = [];

const submissionOptions = {
    'Device': ['Exempt', '510(k)', 'PMA'],
    'Drug': ['NDA', 'ANDA'],
    'Biologic': ['BLA'],
    'Combination': []
};

const acts = ['Design Inputs', 'Regulatory Pathway', 'Clinical Trials', 'Submission and Review', 'Post-market'];

const scenarios = {
    'Device': {
        1: ['Perform risk analysis (ISO 14971)', 'Create Design History File', 'Conduct usability testing'],
        2: ['Choose correct submission route', 'Prepare 510(k) summary', 'Verify labeling compliance'],
        3: ['Plan clinical evaluation', 'Handle adverse events', 'Validate sterilization'],
        4: ['Respond to FDA queries', 'Prepare eCTD', 'Ensure CAPA readiness'],
        5: ['Manage MDR reporting', 'Conduct post-market surveillance', 'Handle recalls']
    },
    'Drug': {
        1: ['Develop preclinical study plan', 'Ensure GCP compliance', 'Prepare IND'],
        2: ['Select NDA or ANDA', 'Prepare labeling', 'Plan bioequivalence study'],
        3: ['Conduct Phase I trial', 'Handle adverse events', 'Prepare statistical analysis'],
        4: ['Submit NDA', 'Respond to FDA review', 'Prepare Advisory Committee briefing'],
        5: ['Monitor pharmacovigilance', 'Submit periodic safety reports', 'Handle recalls']
    },
    'Biologic': {
        1: ['Develop cell line characterization', 'Prepare BLA strategy', 'Ensure GMP compliance'],
        2: ['Select BLA pathway', 'Prepare labeling', 'Plan comparability study'],
        3: ['Conduct Phase I trial', 'Handle immunogenicity issues', 'Prepare statistical analysis'],
        4: ['Submit BLA', 'Respond to FDA review', 'Prepare Advisory Committee briefing'],
        5: ['Monitor post-market safety', 'Submit periodic safety reports', 'Handle recalls']
    }
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

function chooseType(type) {
    player.name = document.getElementById('player-name').value.trim() || 'Anonymous';
    player.type = type;
    document.getElementById('landing').style.display = 'none';
    if (type === 'Combination') {
        document.getElementById('submission-title').innerText = 'Choose two classes for your combination product:';
        let optionsDiv = document.getElementById('submission-options');
        optionsDiv.innerHTML = '';
        ['Device', 'Drug', 'Biologic'].forEach(opt => {
            let btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => selectComboClass(opt);
            optionsDiv.appendChild(btn);
        });
    } else {
        document.getElementById('submission-title').innerText = 'Choose your submission type:';
        let optionsDiv = document.getElementById('submission-options');
        optionsDiv.innerHTML = '';
        submissionOptions[type].forEach(opt => {
            let btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => startGame(opt);
            optionsDiv.appendChild(btn);
        });
    }
    document.getElementById('submission-choice').style.display = 'block';
}

function selectComboClass(opt) {
    if (!player.comboClasses.includes(opt)) {
        player.comboClasses.push(opt);
    }
    if (player.comboClasses.length === 2) {
        startGame('Combination');
    }
}

function startGame(submissionType) {
    player.submissionType = submissionType;
    document.getElementById('submission-choice').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    prepareScenarios();
    loadScenario();
}

function prepareScenarios() {
    currentScenarios = [];
    actScenarioCounts = [];
    if (player.type === 'Combination') {
        for (let act = 1; act <= acts.length; act++) {
            let actScenarios = [];
            player.comboClasses.forEach(cls => {
                actScenarios.push(...scenarios[cls][act]);
            });
            currentScenarios.push(...actScenarios);
            actScenarioCounts.push(actScenarios.length);
        }
    } else {
        for (let act = 1; act <= acts.length; act++) {
            let actScenarios = scenarios[player.type][act];
            currentScenarios.push(...actScenarios);
            actScenarioCounts.push(actScenarios.length);
        }
    }
}

function loadScenario() {
    if (scenarioIndex >= currentScenarios.length) {
        endGame();
        return;
    }
    let actNumber = getCurrentAct();
    document.getElementById('challenge-title').innerText = acts[actNumber - 1] + ' Phase ' + ((scenarioIndex - getActStartIndex(actNumber) + 1));
    document.getElementById('scenario').innerText = 'Scenario: ' + currentScenarios[scenarioIndex];
    document.getElementById('dice-result').innerText = '';
    document.getElementById('dice-animation').style.display = 'none';
    updateStats();
    updateProgress();
}

function rollDice() {
    document.getElementById('dice-animation').style.display = 'block';
    setTimeout(() => {
        document.getElementById('dice-animation').style.display = 'none';
        let roll = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-result').innerText = 'You rolled a ' + roll;
        let choiceIndex;
        if (roll === 1 || roll === 4) choiceIndex = 2; // bad
        else if (roll === 2 || roll === 5) choiceIndex = 1; // neutral
        else choiceIndex = 0; // good
        applyChoice(choiceIndex);
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
    scenarioIndex++;
    if (scenarioIndex === getActEndIndex(getCurrentAct())) {
        triggerBossAnimation(getCurrentAct());
        setTimeout(() => {
            document.getElementById('boss-animation').style.display = 'none';
            loadScenario();
        }, 2000);
    } else {
        loadScenario();
    }
}

function getCurrentAct() {
    let sum = 0;
    for (let i = 0; i < actScenarioCounts.length; i++) {
        sum += actScenarioCounts[i];
        if (scenarioIndex < sum) return i + 1;
    }
    return acts.length;
}

function getActStartIndex(actNumber) {
    return actScenarioCounts.slice(0, actNumber - 1).reduce((a,b) => a+b, 0);
}

function getActEndIndex(actNumber) {
    return actScenarioCounts.slice(0, actNumber).reduce((a,b) => a+b, 0);
}

function triggerBossAnimation(actNumber) {
    document.getElementById('boss-animation').style.display = 'block';
    document.getElementById('boss-animation').innerText = bosses[actNumber - 1] + ' defeated!';
}

function updateStats() {
    document.getElementById('stats').innerText = `Player: ${player.name} | XP: ${player.xp} | Funding: ${player.funding} | Compliance: ${player.compliance}`;
}

function updateProgress() {
    let progressPercent = ((scenarioIndex) / currentScenarios.length) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
}

function endGame() {
    document.getElementById('challenge').style.display = 'none';
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
