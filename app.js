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
const showProgramButton = document.querySelector('#show-program');
const program = document.querySelector('#program');
const guide = document.querySelector('#guide');
const audio = document.querySelector('#audio');
const catalog = document.querySelector('#catalog');
const choiceError = document.querySelector('#choice-error');
const result = document.querySelector('#result');
const reportJson = document.querySelector('#report-json');

let data;

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const items = services
    .filter((service) => {
      return (
        (service.id === 'guide' && guideChecked) ||
        (service.id === 'audio' && audioChecked) ||
        (service.id === 'catalog' && catalogChecked)
      );
    })
    .map((service) => {
      const { title, price } = service;
      return { title: title.trim(), price };
    });

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return { count: items.length, total, items };
}

function handleSubmit(event) {
  event.preventDefault();

  const report = buildReport(data.services, guide.checked, audio.checked, catalog.checked);

  if (report.count === 0) {
    choiceError.textContent = 'Выберите хотя бы одну услугу.';
    choiceError.hidden = false;
    result.hidden = true;
    reportJson.hidden = true;
    return;
  }

  const json = JSON.stringify(report);
  JSON.parse(json);

  const titles = report.items.map((item) => item.title).join('<br>');
  result.innerHTML = `Выбрано услуг: ${report.count}<br>Итого: ${report.total} руб.<br>${titles}`;
  reportJson.textContent = json;

  choiceError.hidden = true;
  result.hidden = false;
  reportJson.hidden = false;
}

function showProgram() {
  program.innerHTML = data.event.meeting;
  program.hidden = false;
}

try {
  data = JSON.parse(sourceJson);
  eventTitle.textContent = data.event.title;
  serviceForm.hidden = false;
  showProgramButton.addEventListener('click', showProgram);
  serviceForm.addEventListener('submit', handleSubmit);
} catch {
  dataError.textContent = 'Ошибка данных.';
  dataError.hidden = false;
  serviceForm.hidden = true;
}
