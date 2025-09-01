const STORAGE_KEY = 'targetDate';

const targetDateInput = document.getElementById('target-date');
const daysCountElement = document.getElementById('days-count');
const titleText = document.getElementById('title-text');
const labelText = document.getElementById('label-text');

function getOneMonthFromNow() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
}

function loadSavedDate() {
    const savedDate = localStorage.getItem(STORAGE_KEY);
    if (savedDate) {
        targetDateInput.value = savedDate;
    } else {
        targetDateInput.value = getOneMonthFromNow();
    }
}

function saveDate(dateValue) {
    localStorage.setItem(STORAGE_KEY, dateValue);
}

function calculateDaysRemaining(targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

function updateDisplay() {
    const targetDate = targetDateInput.value;
    
    if (!targetDate) {
        daysCountElement.textContent = '0';
        return;
    }
    
    const daysRemaining = calculateDaysRemaining(targetDate);
    
    if (daysRemaining < 0) {
        titleText.textContent = 'あの日から';
        labelText.textContent = 'もう';
        daysCountElement.textContent = Math.abs(daysRemaining);
    } else if (daysRemaining === 0) {
        titleText.textContent = '今日が';
        labelText.textContent = 'その日';
        daysCountElement.textContent = '0';
    } else {
        titleText.textContent = 'あの日まで';
        labelText.textContent = 'あと';
        daysCountElement.textContent = daysRemaining;
    }
    
    saveDate(targetDate);
}

targetDateInput.addEventListener('change', updateDisplay);

loadSavedDate();
updateDisplay();