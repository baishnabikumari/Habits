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
        li.className = 'habit-row';
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

function render(){
    renderHabitList();
}

addHabitBtn.addEventListener('click', () => {
    addHabit(newHabitInput.value);
    newHabitInput.value = '';
    newHabitInput.focus();
});

newHabitInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        addHabit(newHabitInput.value);
        newHabitInput.value = '';
    }
});

habitListEl.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.habit-delete');
    if (deleteBtn){
        deleteBtn(deleteBtn.closest('.habit-row').dataset.id);
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