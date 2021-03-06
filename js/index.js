// Загрузка данных при первой загрузке страницы
getData($("#city option:selected").text());

$( "#city" ).selectmenu({
    change: function() {
      getData($("#city option:selected").text());
    }
});

// Запрос к серверу
function getData(city){
  const API_KEY = "c6aaee1b4d15426fa09c9609d9a1c708";

  let jqXHR = $.getJSON(`https://api.weatherbit.io/v2.0/current?city=${city}&lang=ru&key=${API_KEY}&include=minutely`);

        jqXHR.done(function (resp){
          updateUIDone(resp);
        });

        jqXHR.fail(function(err){
          updateUIFail(err);
        });
}

// Обновление интерфейса при ошибке
function updateUIFail(err){

  // Модальное окно с описанием ошибки
  $(".modalErr").dialog();
  $(".modalErrText").text(`${err.statusText}, код ${err.status}`);
}

// Обновление интерфейса при успешном получении данных
function updateUIDone(responce){
    console.log(responce);
    // Главная карточка
    $(".wheatherIcon").attr("src", `../img/${responce.data[0].weather.icon}.png`);
    $(".currentTemp").text(responce.data[0].temp);
    $(".currentAppTemp").text(`Ощущается как ${responce.data[0].app_temp}`);
    $(".currentDesc").text(responce.data[0].weather.description);

    // Второстепенная карточка
    $(".windBlock b").text(`${Math.round(responce.data[0].wind_spd)} м/с`);
    $(".humidityBlock b").text(`${Math.round(responce.data[0].rh)}%`);
    $(".visibilityBlock b").text(`${Math.round(responce.data[0].vis)} км`);

    // принимаем массив с поминутным прогнозом (сразу фильтруем чтобы получить интервал в 5 минут)
    const arrMinutely = responce.minutely.filter((el, idx) => 
      idx % 5 === 0);

    // Вызываем функцию отрисовки графика
    drawChart(arrMinutely);
}

// Рисуем график
function drawChart(arr){

  let arrMinutelyLocalTime = [];
  let arrMinutelyTemp = [];
  let arrMinutelySnow = [];
  let arrMinutelyLiquid = [];

    arr.forEach(item => {
      arrMinutelyLocalTime.push(new Date(item.timestamp_local).toLocaleTimeString());
      arrMinutelyTemp.push(item.temp);
      arrMinutelySnow.push(Math.round(item.snow));
      arrMinutelyLiquid.push((item.precip).toFixed(2));
    })

    console.log(arrMinutelyTemp, arrMinutelyLocalTime, arrMinutelySnow, arrMinutelyLiquid);

    // Если график уже создан - разрушаем его
    if(window.myChart instanceof Chart)
    {
        window.myChart.destroy();
    }

    // Рисуем новый график
    const ctx = $('#myChart');
    window.myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: arrMinutelyLocalTime,
                datasets: [{
                  label: `Температура (C)`, 
                  data: arrMinutelyTemp,
                  backgroundColor: [
                    'rgba(123, 223, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgba(123, 223, 132, 1)',
                  ],
                  borderWidth: 3,
                  fill: false,
                  tension: 0.4
                },
                {
                  label: 'Снегопад (мм/ч)', 
                  data: arrMinutelySnow,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                  ],
                  borderWidth: 3,
                  fill: false,
                  tension: 0.4
                },
                {
                  label: 'Жидкие осадки (мм/ч)', 
                  data: arrMinutelyLiquid,
                  backgroundColor: [
                    'rgba(0, 0, 255, 0.2)',
                  ],
                  borderColor: [
                    'rgba(0, 0, 255, 1)',
                  ],
                  borderWidth: 3,
                  fill: false,
                  tension: 0.4
                },
              
              ]
              },
              options: {
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Прогноз на ближайший час",
                    color: "#000",
                    font: {
                      family: "Inter",
                      size: 20,
                      weight: 'bold',
                      lineHeight: 1.2,
                    }
                  },
                },
                scales: {
                  x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Время',
                    color: "#000",
                    font: {
                       family: "Inter",
                       weight: "bold",
                       size: 14
                    }
                  }
                },
                  y: {
                    display: true,
                    title: {
                     display: true,
                      text: 'Значения',
                      color: "#000",
                      font: {
                        family: "Inter",
                        weight: "bold",
                        size: 14
                      }
                    }
                  }
                }
              }
            });

}




