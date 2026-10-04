const profileInput = document.getElementById('profileInput');
const profilePic = document.getElementById('profilePic');
const defaultPic = profilePic.src;

profileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

const fileInputs = document.querySelectorAll('.file-upload');
fileInputs.forEach(input => {
    input.addEventListener('change', function(e) {
        const category = this.getAttribute('data-category');
        const file = e.target.files[0];
        const fileNameSpan = document.getElementById(category + 'File');
        
        if (file) {
            fileNameSpan.textContent = '✅ ' + file.name;
            localStorage.setItem(category + 'FileName', file.name);
        } else {
            fileNameSpan.textContent = '-';
            localStorage.removeItem(category + 'FileName');
        }
    });
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const data = {
        quiz: document.getElementById('quizScore').value,
        longQuiz: document.getElementById('longQuizScore').value,
        midterm: document.getElementById('midtermScore').value,
        final: document.getElementById('finalScore').value,
        activity: document.getElementById('activityScore').value,
        project: document.getElementById('projectScore').value
    };

    Object.keys(data).forEach(key => {
        localStorage.setItem(key + 'Score', data[key]);
    });

    alert('✅ Portfolio Saved Successfully!');
});

document.getElementById('clearBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all saved data?')) {
        localStorage.clear();
        profilePic.src = defaultPic;
        location.reload();
    }
});

window.addEventListener('load', function() {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) profilePic.src = savedPic;

    ['quiz','longQuiz','midterm','final','activity','project'].forEach(cat => {
        const score = localStorage.getItem(cat + 'Score');
        const file = localStorage.getItem(cat + 'FileName');
        if (score) document.getElementById(cat + 'Score').value = score;
        if (file) document.getElementById(cat + 'File').textContent = '✅ ' + file;
    });
});