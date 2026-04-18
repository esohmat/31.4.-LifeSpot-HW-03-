function filterContent(searchQuery) {
    const elements = document.getElementsByClassName('video-container');
    const query = (searchQuery || '').toLowerCase().trim();

    for (const element of elements) {
        const videoTitle = element.querySelector('.video-title')?.innerText.toLowerCase() || '';
        if (query && !videoTitle.includes(query)) {
            element.style.display = 'none';
        } else {
            element.style.display = 'inline-block';
        }
    }
}
let logger = function () {
    console.log('Начало сессии: ' + window.sessionStorage.getItem('startDate'));
    console.log('Данные клиента: ' + window.sessionStorage.getItem('userAgent'));
    console.log('Возраст пользователя: ' + window.sessionStorage.getItem('userAge'));
};
let checker = function (newVisit) {
    const age = parseInt(window.sessionStorage.getItem('userAge'), 10);

    if (age >= 18) {
        if (newVisit) {
            alert('Приветствуем на LifeSpot! Текущее время: ' + new Date().toLocaleString());
        }
        return true;
    } else {
        alert('Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены');
        window.location.href = 'https://www.google.com';
        return false;
    }
};
function handleSession(logger, checker) {
    if (window.sessionStorage.getItem('startDate') == null) {
        window.sessionStorage.setItem('startDate', new Date().toLocaleString());
    }

    if (window.sessionStorage.getItem('userAgent') == null) {
        window.sessionStorage.setItem('userAgent', window.navigator.userAgent);
    }

    if (window.sessionStorage.getItem('userAge') == null) {
        let input = prompt('Пожалуйста, введите ваш возраст?');
        window.sessionStorage.setItem('userAge', input);
        checker(true);
    } else {
        checker(false);
    }

    logger();
}
document.addEventListener('DOMContentLoaded', function () {
    handleSession(logger, checker);

    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            filterContent(e.target.value);
        });
    }
});  

