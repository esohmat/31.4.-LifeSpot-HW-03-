
let lastInput = '';
function saveInput() {
    const input = document.getElementById('testField');

    if (!input) {
        console.warn('Поле #testField не найдено');
        return;
    }

    const current = input.value.toLowerCase();

    alert('Последний ввод: ' + lastInput + '\nТекущий ввод: ' + current);

    lastInput = current;
}
console.log('testing.js загружен успешно');