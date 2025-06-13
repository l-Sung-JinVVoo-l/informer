// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";



// Отримуємо кнопку та елемент search
const searchButton = document.querySelector('.search__button');
const searchElement = document.querySelector('.search');

// Додаємо обробник події для кліку на кнопку пошуку
searchButton.addEventListener('click', function(event) {
  event.preventDefault(); // Запобігає стандартній поведінці кнопки (якщо це submit)
  
  // Додаємо або видаляємо клас show-input
  searchElement.classList.toggle('show-input');
});

// Додаємо обробник події для всього документа
document.addEventListener('click', function(event) {
  // Перевіряємо, чи клік не відбувся на елементі пошуку або кнопці
  if (!searchElement.contains(event.target) && !searchButton.contains(event.target)) {
    // Якщо клік не на елементі пошуку, видаляємо клас show-input
    searchElement.classList.remove('show-input');
  }
});


document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('searchInput')
	const suggestionsList = document.getElementById('suggestionsBlock') // Використовується 'suggestionsBlock'

	// Приклад списку пропозицій (можна замінити реальними даними)
	const suggestionsData = [
		'Не пришел депозит',
		
	]

	// Функція для оновлення пропозицій на основі введеного значення
	function updateSuggestions(inputValue) {
		// Очищення попередніх пропозицій
		suggestionsList.innerHTML = ''

		// Фільтруємо пропозиції на основі введеного значення
		const filteredSuggestions = suggestionsData.filter(suggestion =>
			suggestion.toLowerCase().includes(inputValue.toLowerCase())
		)

		// Якщо пропозицій не знайдено, показуємо повідомлення
		if (filteredSuggestions.length === 0) {
			suggestionsList.innerHTML =
				'<li class="suggestions__item suggestions__item--not-found">НИЧЕГО НЕ НАЙДЕНО...</li>'
		} else {
			// Створюємо нові елементи списку для кожної пропозиції
			filteredSuggestions.forEach(suggestion => {
				const li = document.createElement('li')
				li.classList.add('suggestions__item')
				li.textContent = suggestion
				suggestionsList.appendChild(li)
			})
		}

		// Показуємо випадаючий список пропозицій
		suggestionsList.classList.add('_active-search')
	}

	// Обробник події введення у поле пошуку
	searchInput.addEventListener('input', function (event) {
		const inputValue = event.target.value.trim()
		updateSuggestions(inputValue)
	})

	// Приховуємо випадаючий список при кліку поза пошуковим полем
	document.addEventListener('click', function (event) {
		if (!event.target.closest('.search')) {
			suggestionsList.classList.remove('_active-search')
		}
	})
})
