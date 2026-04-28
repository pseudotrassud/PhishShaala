// POST /api/submit
//
// Two uses:
//   { scenarioId, userAnswer }  → validate a single answer, return { correct }
//   { answers: { id: answer } } → score everything at end, return { totalScore, emailCorrect, smsCorrect }

// Answer key — never leaves the server
const ANSWERS = {
    1: true,   // HDFC KYC      — phishing
    2: true,   // IT Refund     — phishing
    3: false,  // Zomato Refund — legit
    4: true,   // Amazon Job    — phishing
    5: false,  // Microsoft     — legit
    6: true,   // SBI SMS       — phishing
    7: true,   // BlueDart SMS  — phishing
    8: false,  // Swiggy OTP    — legit
    9: true,   // Netflix SMS   — phishing
    10: true,   // Jio offer     — phishing
};

// Needed to split the final score into email vs SMS buckets
const TYPES = {
    1: 'email', 2: 'email', 3: 'email', 4: 'email', 5: 'email',
    6: 'sms', 7: 'sms', 8: 'sms', 9: 'sms', 10: 'sms',
};

function check(id, answer) {
    const isPhishing = ANSWERS[id];
    return (answer === 'phishing' && isPhishing) || (answer === 'safe' && !isPhishing);
}

module.exports = function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const body = req.body;

    // Single-answer validation (called on every question click for instant feedback)
    if (body.scenarioId !== undefined && body.userAnswer !== undefined) {
        const id = parseInt(body.scenarioId, 10);
        if (!ANSWERS.hasOwnProperty(id)) return res.status(400).json({ error: 'Invalid scenario ID' });
        if (!['safe', 'phishing'].includes(body.userAnswer)) return res.status(400).json({ error: 'Invalid answer' });
        return res.status(200).json({ correct: check(id, body.userAnswer) });
    }

    // Full batch — called when user hits "View Scorecard" to get the authoritative score
    if (body.answers !== undefined) {
        let totalScore = 0, emailCorrect = 0, smsCorrect = 0;
        Object.entries(body.answers).forEach(([idStr, answer]) => {
            const id = parseInt(idStr, 10);
            if (!ANSWERS.hasOwnProperty(id)) return;
            if (check(id, answer)) {
                totalScore += 100;
                TYPES[id] === 'email' ? emailCorrect++ : smsCorrect++;
            }
        });
        return res.status(200).json({ totalScore, emailCorrect, smsCorrect });
    }

    return res.status(400).json({ error: 'Invalid request body' });
};
