const symbols = ['🍎', '🍋', '🍒', '💎', '7️⃣'];
let balance = 100;

const spinBtn = document.getElementById('spin-btn');
const balanceDisplay = document.getElementById('balance');
const message = document.getElementById('message');
const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
];

spinBtn.addEventListener('click', () => {
    if (balance < 10) {
        message.innerText = "Недостатньо коштів!";
        return;
    }

    // Знімаємо ставку
    balance -= 10;
    balanceDisplay.innerText = balance;
    message.innerText = "Крутимо...";
    spinBtn.disabled = true;

    // Анімація "прокрутки"
    let count = 0;
    const interval = setInterval(() => {
        slots.forEach(slot => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            slot.innerText = randomSymbol;
        });
        count++;
        
        if (count > 10) {
            clearInterval(interval);
            checkWin();
        }
    }, 100);
});

function checkWin() {
    const val1 = slots[0].innerText;
    const val2 = slots[1].innerText;
    const val3 = slots[2].innerText;

    if (val1 === val2 && val2 === val3) {
        let prize = 50;
        if (val1 === '7️⃣') prize = 200; // Джекпот за сімки
        if (val1 === '💎') prize = 100;

        balance += prize;
        message.innerText = `ПЕРЕМОГА! Ви виграли $${prize}!`;
        message.style.color = "#f1c40f";
    } else {
        message.innerText = "Спробуйте ще раз!";
        message.style.color = "white";
    }

    balanceDisplay.innerText = balance;
    spinBtn.disabled = false;
}
