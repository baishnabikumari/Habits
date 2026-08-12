const todayDateEl = document.getElementById('todayDate');

function renderTodayDate(){
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric'};
    todayDateEl.textContent = today.toLocaleDateString('en-US', options);
}
renderTodayDate();