# weather-jQuery

Вторая версия приложения для просмотра погоды в выбранном городе, использующая Weather API от [Weatherbit.io](https://www.weatherbit.io/).

С первой версией можно ознакомиться [тут](https://github.com/vitjaz/weather-js).

## Технологии
- HTML/SCSS
- jQuery
- jQuery UI (всего один элемент, представленный ниже)
 ```sh
 $( "#city" ).selectmenu(...);
```
- Chart-JS
## Отличия от первой версии
- Использование jQuery и jQuery UI
- Использование jQuery AJAX вместо Fetch API
- Изменение пользовательского интерфейса (появились картинки, отражающие текущие погодные условия)
- Использование Chart-JS (прогноз на ближайший час с использованием графиков)

## Демонстрация работы приложения
[Weather App jQuery](https://jolly-lamport-18209e.netlify.app/) - Деплой на Netlify
