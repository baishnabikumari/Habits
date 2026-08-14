const STORAGE_KEY = 'habits.date.v1';

const todayDateEl = document.getElementById('todayDate');
const habitListEl = document.getElementById('habitList');
const emptyStateEl = document.getElementById('emptyState');
const newHabitInput = document.getElementById('newHabitInput');
const addHabitBtn = document.getElementById('addHabitBtn');

let state = { habits: [] };

function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) state = JSON.parse(raw);
    } catch (e) {
        console.warn('Could not load saved habits, starting fresh.', e);
        state = { habits: [] };
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

function addHabit(name) {
    const trimmed = name.trim();
    if (trimmed) return;
    state.habits.push({ id: uid(), name: trimmed, createdAt: todayKey(), completions: {} });
    saveState()
    render();
}

function deleteHabit(id) {
    state.habits = state.habits.filter(h => h.id !== id);
    saveState();
    render();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderHabitList() {
    habitListEl.innerHTML = '';

    if (state.habits.length === 0) {
        emptyStateEl.hidden = false;
        return;
    }
    emptyStateEl.hidden = true;

    state.habits.forEach(habit => {
        const li = document.createElement('li');
        const doneToday = !!habit.completions[todayKey()];
        li.className = 'habit-row' + (doneToday ? ' done' : '');
        li.dataset.id = habit.id;
        li.innerHTML = `
            <button class="habit-checkbox" aria-label="Mark ${habit.name} done">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </button>
            <span class="habit-name">${escapeHtml(habit.name)}</span>
            <span class="habit-streak"></span>
            <button class="habit-delete" aria-label="Delete ${habit.name}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        habitListEl.appendChild(li);
    });
}

function dateKeyOffset(daysAgo) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function toggleHabit(id) {
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;
    const key = todayKey();
    if (habit.completions[key]) {
        delete habit.completions[key];
    } else {
        habit.completions[key] = true;
    }
    saveState();
    render();
}

function getCurrentStreak(habit) {
    let streak = 0;
    let offset = habit.completions[todayKey()] ? 0 : 1;
    while (habit.completions[dateKeyOffset(offset)]) {
        streak++;
        offset++;
    }
    return streak;
}

function getLongestStreak(habit) {
    const days = Object.keys(habit.completions).sort();
    if (days.length === 0) return 0;
    let longest = 1;
    let run = 1;
    for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i - 1]);
        const curr = new Date(days[i]);
        const diff = (curr - prev) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            run++;
        } else {
            run = 1;
        }
        longest = Math.max(longest, run);
    }
    return longest;
}

function getCompletionRate(habit) {
    const created = new Date(habit.createdAt);
    const today = new Date(todayKey());
    const daysSinceCreated = Math.floor((today - created) / (1000 * 60 * 60 * 24)) + 1;
    const doneCount = Object.keys(habit.completions).length;
    return daysSinceCreated > 0 ? Math.round((doneCount / daysSinceCreated) * 100) : 0;
}

function updateStats() {
    const totalHabits = state.habits.length;
    document.getElementById('statTotalHabits').textContent = totalHabits;

    if (totalHabits === 0) {
        document.getElementById('statCurrentStreak').textContent = '0';
        document.getElementById('statLongestStreak').textContent = '0';
        document.getElementByIdf('statCompletionRate').textContent = '0';
        return;
    }
    const currentStreak = state.habits.map(getCurrentStreak);
    const LongestStreak = state.habits.map(getLongestStreak);
    const rates = state.habits.map(getCompletionRate);

    document.getElementById('statCurrentStreak').textContent = Math.max(...currentStreak);
    document.getElementById('statLongestStreak').textContent = Math.max(...LongestStreak);
    document.getElementById('statCompletionRate').textContent = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) + '%';
}

function render() {
    renderHabitList();
    updateStats();
}

addHabitBtn.addEventListener('click', () => {
    addHabit(newHabitInput.value);
    newHabitInput.value = '';
    newHabitInput.focus();
});

newHabitInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addHabit(newHabitInput.value);
        newHabitInput.value = '';
    }
});

habitListEl.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.habit-delete');
    if (deleteBtn) {
        deleteHabit(deleteBtn.closest('.habit-row').dataset.id);
        return;
    }
    const checkbox = e.target.closest('.habit-checkbox');
    if (checkbox) {
        toggleHabit(checkbox.closest('habit-row').dataset.id);
    }
});

function renderTodayDate() {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    todayDateEl.textContent = today.toLocaleDateString('en-US', options);
}
renderTodayDate();

loadState();
renderTodayDate();
render();