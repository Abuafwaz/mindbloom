const moods = document.querySelectorAll('.mood');
const journalEntry = document.getElementById('journal-entry');
const saveButton = document.getElementById('save-entry');
const entriesList = document.getElementById('entries-list');
const calmTip = document.getElementById('calm-tip');
const toggleTheme = document.getElementById('toggle-theme');

const tips = [
    "Take 5 deep breaths 🌬️",
    "Go for a short walk 🚶",
    "Drink a glass of water 💧",
    "Listen to calming music 🎶",
    "Write down three things you're grateful for ✍️"
];

calmTip.textContent = tips[Math.floor(Math.random() * tips.length)];

moods.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        const entry = {
            mood: mood,
            note: '',
            date: new Date().toLocaleDateString()
        };
        saveEntry(entry);
    });
});

saveButton.addEventListener('click', () => {
    const noteText = journalEntry.value.trim();
    if (!noteText) {
        alert('Please write something!');
        return;
    }
    const entry = {
        mood: '',
        note: noteText,
        date: new Date().toLocaleDateString()
    };
    saveEntry(entry);
    journalEntry.value = '';
});

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('mindbloom_entries')) || [];
    entries.push(entry);
    localStorage.setItem('mindbloom_entries', JSON.stringify(entries));
    loadEntries();
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('mindbloom_entries')) || [];
    entriesList.innerHTML = '';
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${entry.date}</strong> - ${entry.mood} ${entry.note}`;
        entriesList.appendChild(li);
    });
}

toggleTheme.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

loadEntries();