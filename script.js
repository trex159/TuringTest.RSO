const mediaFiles = [
    { type: 'image', src: 'Res/Wood.jpg', label: 'Mensch', explanation_media: '', explanation_text: 'Dieses Bild hat ein Mensch fotografiert.' },  
    { type: 'audio', src: 'Res/OrchestralAI.mp3', label: 'KI', explanation_media: '', explanation_text: 'Hier ist ein einfacher KI-Soundtrack zu hören.' },  
    { type: 'image', src: 'Res/Trump.Potato.jpg', label: 'Mensch', explanation_media: '', explanation_text: 'Dieses Bild hat ein Mensch bearbeitet.' },  
    { type: 'image', src: 'Res/ChuckNorris.jpg', label: 'KI', explanation_media: '', explanation_text: 'Chuck Norris wurde von einer KI erstellt, das sollte man noch erkennen können.' },
    { type: 'image', src: 'Res/AIwood.jpg', label: 'KI', explanation_media: '', explanation_text: 'Achtet man auf die Blattstrukturen und Details, sollte auffallen, dass hier eine KI am Werk war.' },  
    { type: 'image', src: 'Res/keller.jpg', label: 'Mensch', explanation_media: '', explanation_text: 'Dieses Bild zeigt reale Lichtverhältnisse und Reflexionen, die durch reale Verhältnisse entstanden sind.' },
    { type: 'video', src: 'Res/Dungeon.mp4', label: 'KI', explanation_media: '', explanation_text: 'Die Bewegungen und Verformungen in diesem Video sind für KI-Videos charakteristisch.' },
    { type: 'audio', src: 'Res/MusicM.mp3', label: 'Mensch', explanation_media: '', explanation_text: 'Hier ist ein einfacher Funk-Soundtrack zu hören.' },  
    { type: 'image', src: 'Res/face-swap.png', label: 'KI', explanation_media: 'Res/Proffesor_Original.jpg', explanation_text: 'Hier sieht man zwar ein reales Gesicht und einen realen Körper, aber es wurde Olaf-Schol\'s Gesicht mit KI hinzugefügt, und damit das Original-Gesicht ersetzt.' },
    { type: 'image', src: 'Res/Dog.jpg', label: 'KI', explanation_media: '', explanation_text: 'Man kann erkennen, das hier ein KI-Werk gezeigt wird, indem man zum Beispiel auf die "Kopfhörer" achtet.' },  
    { type: 'image', src: 'Res/Art.png', label: 'Mensch', explanation_media: '', explanation_text: 'Dieses Werk hat ein Mensch digital gezeichnet.' },  
    { type: 'audio', src: 'Res/AIfunk.mp3', label: 'KI', explanation_media: '', explanation_text: 'Hier ist ein einfacher Funk-Soundtrack zu hören, allerdings wurde er mit einer KI generiert.' },  
    { type: 'audio', src: 'Res/Soundtrack.mp3', label: 'Mensch', explanation_media: '', explanation_text: 'Dieser Soundtrack wurde durch Menschenhand erschaffen.' },  
    { type: 'image', src: 'Res/Swords.jpg', label: 'Mensch', explanation_media: '', explanation_text: 'Dieses Bild hat ein Mensch in Starvanger (Fjord in Norwegen) aufgenommen.' },  
    { type: 'audio', src: 'Res/RCiB.mp3', label: 'KI', explanation_media: '', explanation_text: 'Dieses Lied wurde von einer KI generiert.' },  
    { type: 'image', src: 'Res/Wolf.jpg', label: 'KI', explanation_media: '', explanation_text: 'Dieses Werk wurde von einer KI generiert, dass kann man erkennen, wenn man auf die Spitzen der Krone achtet.' },  
];

let currentIndex = 0;
let correctAnswers = 0;
let totalKIAnswers = 0;
let wrongKIAnswers = 0;

function closeInstructions() {
    document.getElementById('instructions').style.display = 'none';
    loadMedia();
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentIndex + 1) / mediaFiles.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function loadMedia() {
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';
    const file = mediaFiles[currentIndex];
    
    document.getElementById('result').textContent = '';
    
    if (file.type === 'image') {
        const img = document.createElement('img');
        img.src = file.src;
        img.alt = 'Test Media';
        mediaContainer.appendChild(img);
    } else if (file.type === 'audio') {
        const audio = document.createElement('audio');
        audio.src = file.src;
        audio.controls = true;
        mediaContainer.appendChild(audio);
    } else if (file.type === 'video') {
        const video = document.createElement('video');
        video.src = file.src;
        video.controls = true;
        mediaContainer.appendChild(video);
    }
}

function answer(userAnswer) {
    const result = document.getElementById('result');
    const file = mediaFiles[currentIndex];
    
    if (userAnswer === file.label) {
        result.textContent = 'Richtig!';
        result.style.color = 'var(--success-green)';
        correctAnswers++;
    } else {
        result.textContent = 'Falsch!';
        result.style.color = 'var(--error-red)';
        if (file.label === 'KI') {
            wrongKIAnswers++;
        }
    }
    
    if (file.label === 'KI') {
        totalKIAnswers++;
    }
    
    document.getElementById('buttons-container').style.display = 'none';
    showExplanation();
}

function showExplanation() {
    const explanation = document.getElementById('explanation');
    explanation.style.display = 'block';
    
    const file = mediaFiles[currentIndex];
    const additionalMedia = document.getElementById('additional-media');
    additionalMedia.innerHTML = '';
    
    if (file.explanation_media) {
        const img = document.createElement('img');
        img.src = file.explanation_media;
        img.alt = 'Additional Explanation Media';
        additionalMedia.appendChild(img);
    }
    
    const explanationText = document.getElementById('explanation-text');
    explanationText.innerHTML = `<p>${file.explanation_text}</p>`;
}

function nextMedia() {
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('buttons-container').style.display = 'flex';
    currentIndex++;
    
    if (currentIndex < mediaFiles.length) {
        loadMedia();
        updateProgressBar();
    } else {
        showSummary();
    }
}

function showSummary() {
    const summary = document.getElementById('summary');
    const scoreElement = document.getElementById('score');
    const detailedStats = document.getElementById('detailed-stats');
    
    const totalQuestions = mediaFiles.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    scoreElement.innerHTML = `
        <div class="score-container cyber-box">
            <div class="score-header">
                <div class="score-title">Gesamtergebnis</div>
                <div class="score-percentage">${score}%</div>
            </div>
            <div class="score-details">
                <div class="score-item">
                    <span class="score-label">Richtige Antworten:</span>
                    <span class="score-value">${correctAnswers} von ${totalQuestions}</span>
                </div>
                <div class="score-item">
                    <span class="score-label">Falsche Antworten:</span>
                    <span class="score-value">${incorrectAnswers} von ${totalQuestions}</span>
                </div>
            </div>
        </div>
    `;
    
    const turingTestPassed = (incorrectAnswers / totalQuestions) >= 0.5;
    const turingMessage = turingTestPassed
        ? 'Die KI hat den Test bestanden! Die Unterscheidung zwischen KI und Mensch war schwierig.'
        : 'Die KI hat den Test nicht bestanden! Die Unterscheidung zwischen KI und Mensch war zu einfach.';
    
    detailedStats.innerHTML = `
        <div class="stats-container cyber-box">
            <div class="turing-result ${turingTestPassed ? 'passed' : 'failed'}">
                <div class="turing-icon">${turingTestPassed ? '🤖✨' : '🤖❌'}</div>
                <p>${turingMessage}</p>
            </div>
            <div class="ai-detection">
                <div class="detection-title">KI-Erkennung</div>
                <div class="detection-stats">
                    <div class="stat-circle">
                        <span class="stat-number">${totalKIAnswers - wrongKIAnswers}</span>
                        <span class="stat-label">KI-Inhalte erkannt</span>
                    </div>
                    <div class="stat-circle">
                        <span class="stat-number">${totalKIAnswers}</span>
                        <span class="stat-label">KI-Inhalte gesamt</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('buttons-container').style.display = 'none';
    document.getElementById('explanation').style.display = 'none';
    summary.style.display = 'block';
}

function restart() {
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('instructions').style.display = 'flex';
});