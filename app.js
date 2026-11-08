const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

const eventTitle = document.querySelector('#event-title');
const serviceForm = document.querySelector('#service-form');
const dataError = document.querySelector('#data-error');

let data;

try {
  data = JSON.parse(sourceJson);
  eventTitle.textContent = data.event.title;
  serviceForm.hidden = false;
} catch {
  dataError.textContent = 'Ошибка данных.';
  dataError.hidden = false;
  serviceForm.hidden = true;
}
