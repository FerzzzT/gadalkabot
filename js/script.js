// Инициализация Telegram WebApp
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

// Переменная для хранения event
let event = null;

// Получаем параметры из initData
let encoded = initData.start_param;
encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
while (encoded.length % 4 !== 0) {
    encoded += '=';
}
const decoded = atob(encoded);
const params = JSON.parse(decoded);
// Список карт
const cardImages = {
    'Колесница': 'css/cards/the_chariot.jpg',
    'Шут': 'css/cards/the_fool.jpg',
    'Волшебник': 'css/cards/the_magician.jpg',
    'Верховная жрица': 'css/cards/the_high_priestess.jpg',
    'Императрица': 'css/cards/the_empress.jpg',
    'Император': 'css/cards/the_emperor.jpg',
    'Иерофант': 'css/cards/the_hierophant.jpg',
    'Звезда': 'css/cards/the_star.jpg',
    'Солнце': 'css/cards/the_sun.jpg',
    'Любовник': 'css/cards/the_lover.jpg',
    'Сила': 'css/cards/strength.jpg',
    'Отшельник': 'css/cards/the_hermit.jpg',
    'Судья': 'css/cards/justice.jpg',
    'Колесо удачи': 'css/cards/wheel_fortune.jpg',
    'Смерть': 'css/cards/death.jpg',
    'Повешенный человек': 'css/cards/the_hanged_man.jpg',
    'Сдержанность': 'css/cards/temperance.jpg',
    'Мир': 'css/cards/the_world.jpg',
    'Кара': 'css/cards/judgement.jpg',
    'Луна': 'css/cards/the_moon.jpg',
    'Башня': 'css/cards/the_tower.jpg',
    'Дьявол': 'css/cards/the_devil.jpg',
    'Туз Денариев': 'css/cards/age_pentacles.jpg',
    '2 Пентаклей': 'css/cards/2d.jpg',
    '3 Пентаклей': 'css/cards/3d.jpg',
    '4 Пентаклей': 'css/cards/4d.jpg',
    '5 Пентаклей': 'css/cards/5d.jpg',
    '6 Пентаклей': 'css/cards/6d.jpg',
    '7 Пентаклей': 'css/cards/7d.jpg',
    '8 Пентаклей': 'css/cards/8d.jpg',
    '9 Пентаклей': 'css/cards/9d.jpg',
    '10 Пентаклей': 'css/cards/10d.jpg',
    'Король Пентаклей': 'css/cards/king_pentacles.jpg',
    'Королева Пентаклей': 'css/cards/queen_pentacles.jpg',
    'Рыцарь Пентаклей': 'css/cards/knight_pentacles.jpg',
    'Паж Пентаклей': 'css/cards/page_pentacles.jpg',
    'Туз Мечей': 'css/cards/age_swords.jpg',
    '2 Мечей': 'css/cards/2s.jpg',
    '3 Мечей': 'css/cards/3s.jpg',
    '4 Мечей': 'css/cards/4s.jpg',
    '5 Мечей': 'css/cards/5s.jpg',
    '6 Мечей': 'css/cards/6s.jpg',
    '7 Мечей': 'css/cards/7s.jpg',
    '8 Мечей': 'css/cards/8s.jpg',
    '9 Мечей': 'css/cards/9s.jpg',
    '10 Мечей': 'css/cards/10s.jpg',
    'Рыцарь Мечей': 'css/cards/ks.jpg',
    'Паж Мечей': 'css/cards/ps.jpg',
    'Король Мечей': 'css/cards/king_swords.jpg',
    'Королева Мечей': 'css/cards/qs.jpg',
    'Туз Жезлов': 'css/cards/1g.jpg',
    '2 Жезлов': 'css/cards/2g.jpg',
    '3 Жезлов': 'css/cards/3g.jpg',
    '4 Жезлов': 'css/cards/4g.jpg',
    '5 Жезлов': 'css/cards/5g.jpg',
    '6 Жезлов': 'css/cards/6g.jpg',
    '7 Жезлов': 'css/cards/7g.jpg',
    '8 Жезлов': 'css/cards/8g.jpg',
    '9 Жезлов': 'css/cards/9g.jpg',
    '10 Жезлов': 'css/cards/10g.jpg',
    'Королева Жезлов': 'css/cards/qg.jpg',
    'Рыцарь Жезлов': 'css/cards/kw.jpg',
    'Паж Жезлов': 'css/cards/pw.jpg',
    'Король Жезлов': 'css/cards/king_g.jpg',
};

// Основная логика: выбор случайных карт
const shuffledCards = Object.entries(cardImages)
    .sort(() => 0.5 - Math.random())
    .slice(0, 9); // Берем 9 случайных карт

const cardsContainer = document.getElementById("cardsContainer");
let selectedCards = [];
let selectedCardNames = [];

if (!cardsContainer) {
    console.error("Элемент с id='cardsContainer' не найден!");
} else {
    shuffledCards.forEach(([cardName, imagePath]) => {
        const card = document.createElement("div");
        card.classList.add("tarot-card", "cursor-pointer");
        card.innerHTML = `
            <div class="card-back"></div>
            <div class="card-placeholder" style="background-image: url('${imagePath}')"></div>`;

        card.addEventListener("click", function () {
            if (!selectedCards.includes(this) && selectedCards.length < 3) {
                selectedCards.push(this);
                selectedCardNames.push(cardName);
                this.classList.add("flipped", "selected");
                this.classList.remove("cursor-pointer");
            }
            const continueBtn = document.getElementById("continueBtn");
            if (continueBtn) {
                continueBtn.classList.toggle("hidden", selectedCards.length !== 3);
            }
        });

        cardsContainer.appendChild(card);
    });
}

// Обработчик кнопки "Продолжить" для отправки данных
const continueBtn = document.getElementById("continueBtn");
if (continueBtn) {
    continueBtn.addEventListener("click", function() {
        const data = { cards: selectedCardNames, event: event };
        console.log("Отправляем в бота:", data);
        window.Telegram.WebApp.sendData(JSON.stringify(data));
    });
} else {
    console.error("Элемент с id='continueBtn' не найден!");
}