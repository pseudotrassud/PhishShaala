(function () {
    const defaults = { totalScore: 750, emailCorrect: 4, smsCorrect: 2 };
    let data;
    try { data = JSON.parse(localStorage.getItem('phishshaala_score')) || defaults; }
    catch { data = defaults; }

    const { totalScore, emailCorrect, smsCorrect } = data;
    const totalQuestions = 10;
    const correctTotal = Math.round(totalScore / 100);
    const pct = Math.min(100, Math.round((correctTotal / totalQuestions) * 100));

    // Map percentage to a red→green hue (0° = red, 120° = green)
    const hue = Math.round((pct / 100) * 120);
    const scoreColor = `hsl(${hue}, 85%, 55%)`;
    const trackColor = '#0A1128';
    const finalGradient = `conic-gradient(${scoreColor} 0% ${pct}%, ${trackColor} ${pct}% 100%)`;

    // Trigger CSS animation by removing and re-adding the class (forces reflow)
    const circle = document.querySelector('.score-circle');
    circle.style.setProperty('--final-gradient', finalGradient);
    circle.style.background = finalGradient;
    circle.classList.remove('animate-score');
    void circle.offsetWidth;
    circle.classList.add('animate-score');

    document.getElementById('score-percentage').innerHTML =
        pct + `<span class="text-2xl" style="color:${scoreColor}">%</span>`;
    document.getElementById('score-fraction').textContent = `Score: ${correctTotal}/${totalQuestions}`;

    let badge = 'Beginner 🎣';
    if (pct >= 90) badge = 'Elite Defender 🛡️';
    else if (pct >= 70) badge = 'Expert Spotter 🔍';
    else if (pct >= 50) badge = 'Phish Fighter ⚔️';
    else if (pct >= 30) badge = 'Getting There 📈';

    document.getElementById('badge-label').textContent = badge;
    document.getElementById('badge-badge').style.backgroundColor = scoreColor;

    document.getElementById('email-score').textContent = `${emailCorrect}/5`;
    document.getElementById('sms-score').textContent = `${smsCorrect}/5`;

    // Pick icon based on performance: pass ≥60%, borderline ≥40%, fail below
    function setIcon(elId, correct) {
        const el = document.getElementById(elId);
        const pct = (correct / 5) * 100;
        el.textContent = pct >= 60 ? 'check_circle' : pct >= 40 ? 'warning' : 'cancel';
        el.className = 'material-symbols-outlined ' + (pct >= 60 ? 'text-emerald-500' : pct >= 40 ? 'text-amber-500' : 'text-red-500');
    }
    setIcon('email-icon', emailCorrect);
    setIcon('sms-icon', smsCorrect);
})();
