const pairInput = document.getElementById('pairInput');
const pairList = document.getElementById('pairList');

function addPair() {
    const input = pairInput.value.trim();
    const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/;

    if (!regex.test(input)) {
        alert('Невірний формат. Введіть як Name=Value.');
        return;
    }

    const [_, name, value] = input.match(regex);
    const option = document.createElement('option');
    option.text = `${name}=${value}`;
    pairList.add(option);
    pairInput.value = '';
}

function sortByName() {
    sortList((a, b) => {
        const nameA = a.split('=')[0];
        const nameB = b.split('=')[0];
        return nameA.localeCompare(nameB);
    });
}

function sortByValue() {
    sortList((a, b) => {
        const valueA = a.split('=')[1];
        const valueB = b.split('=')[1];

        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);

        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }

        // Якщо не числа, порівнюємо текст
        return valueA.localeCompare(valueB);
    });
}

function deleteSelected() {
    Array.from(pairList.selectedOptions).forEach(option => option.remove());
}

function sortList(compareFn) {
    const options = Array.from(pairList.options);
    options.sort((a, b) => compareFn(a.text, b.text));
    pairList.innerHTML = ''; // Очищаємо список
    options.forEach(option => pairList.add(option));
}
