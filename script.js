// Explanations dictionary
const explanations = {
  'Device': {
    'Perform risk analysis (ISO 14971)': 'Risk analysis ensures hazards are identified and mitigated, aligning with ISO 14971 and FDA requirements for device safety.',
    'Create Design History File': 'Maintaining a DHF is required under 21 CFR 820.30 to document design controls and demonstrate compliance.',
    'Conduct usability testing': 'Usability testing reduces user error and meets FDA human factors guidance for safe device operation.',
    'Choose correct submission route': 'Selecting the proper pathway (510(k), PMA, etc.) ensures regulatory compliance and avoids delays or rejection.',
    'Prepare 510(k) summary': 'A complete 510(k) summary demonstrates substantial equivalence, a key FDA requirement for clearance.',
    'Verify labeling compliance': 'Accurate labeling meets FDA requirements under 21 CFR Part 801, ensuring proper use and safety.',
    'Plan clinical evaluation': 'Clinical evaluation supports safety and effectiveness claims, required for higher-risk devices.',
    'Handle adverse events': 'Prompt reporting of adverse events complies with MDR regulations and protects patient safety.',
    'Validate sterilization': 'Sterilization validation ensures product sterility per ISO 11135/11137 and FDA expectations.',
    'Respond to FDA queries': 'Timely, complete responses maintain regulatory trust and prevent submission delays.',
    'Prepare eCTD': 'Electronic submissions in eCTD format meet FDA standards for efficient review.',
    'Ensure CAPA readiness': 'Corrective and Preventive Actions comply with 21 CFR 820.100 to address systemic issues.',
    'Manage MDR reporting': 'Medical Device Reporting is mandatory under 21 CFR Part 803 to monitor post-market safety.',
    'Conduct post-market surveillance': 'Post-market surveillance ensures ongoing compliance and patient safety per FDA guidance.',
    'Handle recalls': 'Executing recalls promptly meets FDA requirements and mitigates patient risk.'
  },
  'Drug': {
    'Develop preclinical study plan': 'Preclinical studies demonstrate safety before human trials, required under FDA IND regulations.',
    'Ensure GCP compliance': 'Good Clinical Practice ensures ethical and scientifically sound trials per FDA and ICH guidelines.',
    'Prepare IND': 'An Investigational New Drug application is required before starting clinical trials.',
    'Select NDA or ANDA': 'Choosing the correct submission type ensures compliance with FDA approval pathways.',
    'Prepare labeling': 'Drug labeling must meet FDA standards under 21 CFR Part 201 for safety and efficacy.',
    'Plan bioequivalence study': 'Bioequivalence studies are required for ANDA submissions to demonstrate therapeutic equivalence.',
    'Conduct Phase I trial': 'Phase I trials establish safety and dosage, a critical FDA requirement before later phases.',
    'Handle adverse events': 'Prompt reporting of adverse events complies with FDA pharmacovigilance requirements.',
    'Prepare statistical analysis': 'Robust statistical analysis ensures validity of trial results per FDA guidance.',
    'Submit NDA': 'An NDA submission is required for FDA approval of new drugs.',
    'Respond to FDA review': 'Addressing FDA queries promptly ensures smooth review and approval.',
    'Prepare Advisory Committee briefing': 'Comprehensive briefing supports FDA decision-making for complex products.',
    'Monitor pharmacovigilance': 'Ongoing safety monitoring is required post-market under FDA regulations.',
    'Submit periodic safety reports': 'Periodic reports maintain compliance and inform FDA of emerging risks.',
    'Handle recalls': 'Executing recalls promptly meets FDA requirements and mitigates patient harm.'
  },
  'Biologic': {
    'Develop cell line characterization': 'Characterizing cell lines ensures consistency and safety, critical for biologics per FDA and ICH guidelines.',
    'Prepare BLA strategy': 'A clear Biologics License Application strategy aligns with FDA expectations for approval.',
    'Ensure GMP compliance': 'Good Manufacturing Practice compliance ensures product quality and patient safety.',
    'Select BLA pathway': 'Choosing the correct BLA pathway ensures regulatory compliance and efficient review.',
    'Prepare labeling': 'Biologic labeling must meet FDA standards under 21 CFR Part 201 for safety and efficacy.',
    'Plan comparability study': 'Comparability studies ensure product consistency after manufacturing changes.',
    'Conduct Phase I trial': 'Phase I trials establish safety and dosage, critical for biologics before later phases.',
    'Handle immunogenicity issues': 'Managing immunogenicity is essential for biologic safety and efficacy.',
    'Prepare statistical analysis': 'Robust statistical analysis ensures validity of trial results per FDA guidance.',
    'Submit BLA': 'A BLA submission is required for FDA approval of biologics.',
    'Respond to FDA review': 'Addressing FDA queries promptly ensures smooth review and approval.',
    'Prepare Advisory Committee briefing': 'Comprehensive briefing supports FDA decision-making for complex biologics.',
    'Monitor post-market safety': 'Ongoing safety monitoring is required post-market under FDA regulations.',
    'Submit periodic safety reports': 'Periodic reports maintain compliance and inform FDA of emerging risks.',
    'Handle recalls': 'Executing recalls promptly meets FDA requirements and mitigates patient harm.'
  }
};

// Existing game logic with explanation integration
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
    if (choiceIndex === 0) {
      document.getElementById('explanation').innerText = explanations[player.type][currentScenarios[scenarioIndex]];
    } else {
      document.getElementById('explanation').innerText = '';
    }
    document.getElementById('next-button').style.display = 'inline-block';
    document.getElementById('roll-button').style.display = 'none';
  }, 1500);
}
