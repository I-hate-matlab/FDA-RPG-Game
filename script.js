const explanations = {
    'Device': {
        'Perform risk analysis (ISO 14971)': 'Review: Risk analysis ensures hazards are identified and mitigated, aligning with ISO 14971 and FDA requirements for device safety.',
        'Create Design History File': 'Review: Maintaining a DHF is required under 21 CFR 820.30 to document design controls and demonstrate compliance.',
        'Conduct usability testing': 'Review: Usability testing reduces user error and meets FDA human factors guidance for safe device operation.',
        'Choose correct submission route': 'Review: Selecting the proper pathway (510(k), PMA, etc.) ensures regulatory compliance and avoids delays or rejection.',
        'Prepare 510(k) summary': 'Review: A complete 510(k) summary demonstrates substantial equivalence, a key FDA requirement for clearance.',
        'Verify labeling compliance': 'Review: Accurate labeling meets FDA requirements under 21 CFR Part 801, ensuring proper use and safety.',
        'Plan clinical evaluation': 'Review: Clinical evaluation supports safety and effectiveness claims, required for higher-risk devices.',
        'Handle adverse events': 'Review: Prompt reporting of adverse events complies with MDR regulations and protects patient safety.',
        'Validate sterilization': 'Review: Sterilization validation ensures product sterility per ISO 11135/11137 and FDA expectations.',
        'Respond to FDA queries': 'Review: Timely, complete responses maintain regulatory trust and prevent submission delays.',
        'Prepare eCTD': 'Review: Electronic submissions in eCTD format meet FDA standards for efficient review.',
        'Ensure CAPA readiness': 'Review: Corrective and Preventive Actions comply with 21 CFR 820.100 to address systemic issues.',
        'Manage MDR reporting': 'Review: Medical Device Reporting is mandatory under 21 CFR Part 803 to monitor post-market safety.',
        'Conduct post-market surveillance': 'Review: Post-market surveillance ensures ongoing compliance and patient safety per FDA guidance.',
        'Handle recalls': 'Review: Executing recalls promptly meets FDA requirements and mitigates patient risk.'
    },
    'Drug': {
        'Develop preclinical study plan': 'Review: Preclinical studies demonstrate safety before human trials, required under FDA IND regulations.',
        'Ensure GCP compliance': 'Review: Good Clinical Practice ensures ethical and scientifically sound trials per FDA and ICH guidelines.',
        'Prepare IND': 'Review: An Investigational New Drug application is required before starting clinical trials.',
        'Select NDA or ANDA': 'Review: Choosing the correct submission type ensures compliance with FDA approval pathways.',
        'Prepare labeling': 'Review: Drug labeling must meet FDA standards under 21 CFR Part 201 for safety and efficacy.',
        'Plan bioequivalence study': 'Review: Bioequivalence studies are required for ANDA submissions to demonstrate therapeutic equivalence.',
        'Conduct Phase I trial': 'Review: Phase I trials establish safety and dosage, a critical FDA requirement before later phases.',
        'Handle adverse events': 'Review: Prompt reporting of adverse events complies with FDA pharmacovigilance requirements.',
        'Prepare statistical analysis': 'Review: Robust statistical analysis ensures validity of trial results per FDA guidance.',
        'Submit NDA': 'Review: An NDA submission is required for FDA approval of new drugs.',
        'Respond to FDA review': 'Review: Addressing FDA queries promptly ensures smooth review and approval.',
        'Prepare Advisory Committee briefing': 'Review: Comprehensive briefing supports FDA decision-making for complex products.',
        'Monitor pharmacovigilance': 'Review: Ongoing safety monitoring is required post-market under FDA regulations.',
        'Submit periodic safety reports': 'Review: Periodic reports maintain compliance and inform FDA of emerging risks.',
        'Handle recalls': 'Review: Executing recalls promptly meets FDA requirements and mitigates patient harm.'
    },
    'Biologic': {
        'Develop cell line characterization': 'Review: Characterizing cell lines ensures consistency and safety, critical for biologics per FDA and ICH guidelines.',
        'Prepare BLA strategy': 'Review: A clear Biologics License Application strategy aligns with FDA expectations for approval.',
        'Ensure GMP compliance': 'Review: Good Manufacturing Practice compliance ensures product quality and patient safety.',
        'Select BLA pathway': 'Review: Choosing the correct BLA pathway ensures regulatory compliance and efficient review.',
        'Prepare labeling': 'Review: Biologic labeling must meet FDA standards under 21 CFR Part 201 for safety and efficacy.',
        'Plan comparability study': 'Review: Comparability studies ensure product consistency after manufacturing changes.',
        'Conduct Phase I trial': 'Review: Phase I trials establish safety and dosage, critical for biologics before later phases.',
        'Handle immunogenicity issues': 'Review: Managing immunogenicity is essential for biologic safety and efficacy.',
        'Prepare statistical analysis': 'Review: Robust statistical analysis ensures validity of trial results per FDA guidance.',
        'Submit BLA': 'Review: A BLA submission is required for FDA approval of biologics.',
        'Respond to FDA review': 'Review: Addressing FDA queries promptly ensures smooth review and approval.',
        'Prepare Advisory Committee briefing': 'Review: Comprehensive briefing supports FDA decision-making for complex biologics.',
        'Monitor post-market safety': 'Review: Ongoing safety monitoring is required post-market under FDA regulations.',
        'Submit periodic safety reports': 'Review: Periodic reports maintain compliance and inform FDA of emerging risks.',
        'Handle recalls': 'Review: Executing recalls promptly meets FDA requirements and mitigates patient harm.'
    }
};

function loadExplanation() {
    const scenario = currentScenarios[scenarioIndex];
    const explanationText = explanations[player.type][scenario] || '';
    document.getElementById('explanation').innerText = explanationText;
}

let player = { name: '', type: '', xp: 0, funding: 0, compliance: 0, submissionType: '', bonusPercent: 0 };
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let scenarioIndex = 0;
let currentScenarios = [];
let chosenOption = '';

const submissionOptions = {
    'Device': ['Exempt', '510(k)', 'PMA'],
    'Drug': ['NDA', 'ANDA'],
    'Biologic': ['BLA']
};

const submissionInfo = {
    'Device': {
        'Exempt': 'No bonus (0%)',
        '510(k)': 'Funding bonus: 5%',
        'PMA': 'Funding bonus: 10%'
    },
    'Drug': {
        'NDA': 'Funding bonus: 5%',
        'ANDA': 'No bonus (0%)'
    },
    'Biologic': {
        'BLA': 'No bonus (0%)'
    }
};

const bonusPercentages = {
    'Exempt': 0,
    '510(k)': 5,
    'PMA': 10,
    'NDA': 5,
    'ANDA': 0,
    'BLA': 0
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
    document.getElementById('submission-info').innerText = 'Benefits: ' + Object.entries(submissionInfo[type]).map(([k,v]) => `${k}: ${v}`).join(', ');
    document.getElementById('submission-choice').style.display = 'block';
}

function startGame(submissionType) {
    player.submissionType = submissionType;
    player.bonusPercent = bonusPercentages[submissionType];
    player.funding = 20; // Reduced starting funding
    player.xp = 0;
    player.compliance = 0;
    scenarioIndex = 0;
    document.getElementById('submission-choice').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
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
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = `<p>Options:</p><p>1) ${currentScenarios[scenarioIndex]}</p><p>2) Do nothing</p><p>3) ${badChoices[scenarioIndex % badChoices.length]}</p>`;
    document.getElementById('dice-result').innerText = '';
    document.getElementById('dice-animation').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('roll-button').style.display = 'inline-block';
    updateStats();
    updateProgress();
    loadExplanation();
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
        document.getElementById('roll-button').style.display = 'none';
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
        let penaltyFactor = 1 + player.bonusPercent / 100;
        player.xp += 5;
        player.funding -= Math.floor(2 * penaltyFactor);
        player.compliance -= Math.floor(2 * penaltyFactor);
        if (player.funding < 0) player.funding = 0;
        if (player.compliance < 0) player.compliance = 0;
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
        btn.innerText = `${opt.text} (Funding Cost: ${opt.cost})`;
        btn.onclick = () => chooseBossOption(opt);
        bossOptionsDiv.appendChild(btn);
    });
    if (player.funding < 6) {
        document.getElementById('dissolve-button').style.display = 'inline-block';
    } else {
        document.getElementById('dissolve-button').style.display = 'none';
    }
    updateBossStats();
}

function chooseBossOption(option) {
    if (player.funding >= option.cost) {
        player.funding -= option.cost;
        player.xp += option.reward.xp;
        let bonusCompliance = Math.floor(option.reward.compliance * (1 + player.bonusPercent / 100));
        player.compliance += bonusCompliance;
    } else {
        alert('Not enough funding for this option!');
        return;
    }
    document.getElementById('boss-phase').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    loadScenario();
}

function dissolveBusiness() {
    document.getElementById('boss-phase').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    leaderboard.push({ name: player.name, type: player.type, score: 'Dissolved Business' });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
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
    leaderboard.push({ name: player.name, type: player.type, score: player.xp + ' XP, Funding: ' + player.funding + ', Compliance: ' + player.compliance });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    let scoresList = document.getElementById('scores');
    scoresList.innerHTML = '';
    leaderboard.forEach(entry => {
        let li = document.createElement('li');
        li.innerText = `${entry.name} (${entry.type}) - ${entry.score}`;
        scoresList.appendChild(li);
    });
}

function resetLeaderboard() {
    localStorage.removeItem('leaderboard');
    leaderboard = [];
    displayLeaderboard();
}

function startNewGame() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('landing').style.display = 'block';
}
