// Подключаем Telegram Web App API (добавь в HTML: <script src="https://telegram.org/js/telegram-web-app.js"></script>)
window.Telegram.WebApp.ready(); // Сообщаем Telegram, что приложение готово
window.Telegram.WebApp.expand(); // Растягиваем приложение на весь экран

// Заменяем alert на Telegram-уведомление
window.Telegram.WebApp.showAlert("Mini App готово!");

// Список карт
const cardImages = [
    'css/cards/the_chariot.jpg', 'css/cards/the_fool.jpg', 'css/cards/the_magician.jpg',
    'css/cards/the_high_priestess.jpg', 'css/cards/the_empress.jpg', 'css/cards/the_emperor.jpg',
    'css/cards/the_hierophant.jpg', 'css/cards/the_star.jpg', 'css/cards/the_sun.jpg',
    'css/cards/the_lover.jpg', 'css/cards/strength.jpg', 'css/cards/the_hermit.jpg',
    'css/cards/justice.jpg', 'css/cards/wheel_fortune.jpg', 'css/cards/death.jpg',
    'css/cards/the_hanged_man.jpg', 'css/cards/temperance.jpg', 'css/cards/the_world.jpg',
    'css/cards/judgement.jpg', 'css/cards/the_moon.jpg', 'css/cards/the_tower.jpg',
    'css/cards/the_devil.jpg', 'css/cards/age_pentacles.jpg', 'css/cards/2d.jpg',
    'css/cards/3d.jpg', 'css/cards/4d.jpg', 'css/cards/5d.jpg',
    'css/cards/9d.jpg', 'css/cards/10d.jpg', 'css/cards/8d.jpg',
    'css/cards/king_pentacles.jpg', 'css/cards/6d.jpg', 'css/cards/7d.jpg',
    'css/cards/queen_pentacles.jpg', 'css/cards/knight_pentacles.jpg', 'css/cards/page_pentacles.jpg',
    'css/cards/age_swords.jpg', 'css/cards/2s.jpg', 'css/cards/3s.jpg',
    'css/cards/4s.jpg', 'css/cards/5s.jpg', 'css/cards/6s.jpg',
    'css/cards/7s.jpg', 'css/cards/8s.jpg', 'css/cards/9s.jpg',
    'css/cards/10s.jpg', 'css/cards/ks.jpg', 'css/cards/ps.jpg',
    'css/cards/king_swords.jpg', 'css/cards/qs.jpg',
    'css/cards/1g.jpg', 'css/cards/2g.jpg', 'css/cards/3g.jpg',
    'css/cards/4g.jpg', 'css/cards/5g.jpg', 'css/cards/6g.jpg',
    'css/cards/7g.jpg', 'css/cards/8g.jpg', 'css/cards/9g.jpg',
    'css/cards/10g.jpg', 'css/cards/qg.jpg', 'css/cards/kw.jpg',
    'css/cards/pw.jpg', 'css/cards/king_g.jpg',
];

// Основная логика
const shuffledCards = cardImages.sort(() => 0.5 - Math.random()).slice(0, 9);
const cardsContainer = document.getElementById("cardsContainer");
let selectedCards = [];
let selectedCardNames = [];

shuffledCards.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("tarot-card", "cursor-pointer");
    card.innerHTML = `<div class="card-back"></div><div class="card-placeholder" style="background-image: url('${image}')"></div>`;

    card.addEventListener("click", function () {
        if (!selectedCards.includes(this) && selectedCards.length < 3) {
            selectedCards.push(this);
            selectedCardNames.push(image);
            this.classList.add("flipped", "selected");
            this.classList.remove("cursor-pointer");
        }
        document.getElementById("continueBtn").classList.toggle("hidden", selectedCards.length !== 3);
    });

    cardsContainer.appendChild(card);
});

// Обработчик кнопки отправки данных
document.getElementById("sendData").addEventListener("click", function() {
    let data = { cards: selectedCardNames }; // Используем имена карт вместо DOM-элементов
    // Пример отправки данных в Telegram
    window.Telegram.WebApp.sendData(JSON.stringify(data)); // Отправляем данные боту
    window.Telegram.WebApp.showAlert("Выбраны карты: " + selectedCardNames.join(", "));
});