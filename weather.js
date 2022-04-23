const BASE_URL = "http://wttr.in/";
const format = "?format=j1";
//get main
// let didSearch = false;
const mainArticle = document.getElementById("main-location");
const weather = document.getElementById("weather");
const previousHistory = document.getElementById("history");
const noSearchYet = document.getElementById("no-search");
const historyList = document.getElementById("history-list");

let cityName;
const mainForm = document.querySelector("form");
const input = document.querySelector("input");
mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
  cityName = input.value;

  console.log(cityName);

  let weatherData;
  fetch(`${BASE_URL}${cityName}${format}`)
    .then((response) => response.json())
    .then((result) => {
      weatherData = result;

      console.log(weatherData);

      mainCityWeather(weatherData);
    })
    .catch((error) => console.log("oopsies", error));
});
// main variables & attributes & appends

const mainCityHeading = document.createElement("h3");
const mainCityArea = document.createElement("p");
const mainCityRegion = document.createElement("p");
const mainCityCountry = document.createElement("p");
const mainCityFeels = document.createElement("p");
const chanceOfRain = document.createElement("p");
const chanceOfSnow = document.createElement("p");
const chanceOfSunny = document.createElement("p");

mainCityHeading.setAttribute("id", "cityHeading");
mainCityArea.setAttribute("id", "cityArea");
mainCityRegion.setAttribute("id", "cityRegion");
mainCityCountry.setAttribute("id", "cityCountry");
mainCityFeels.setAttribute("id", "cityFeels");
chanceOfSunny.setAttribute("id", "sunny");
chanceOfRain.setAttribute("id", "rain");
chanceOfSnow.setAttribute("id", "snow");

mainArticle.after(chanceOfSunny, chanceOfRain, chanceOfSnow);
mainArticle.append(mainCityHeading);
mainArticle.append(
  mainCityArea,
  mainCityRegion,
  mainCityCountry,
  mainCityFeels
);

// img variables & attributes & appends
let chanceOfImage = document.createElement('img');
chanceOfImage.setAttribute('id', 'chance-img');
chanceOfImage.setAttribute("width", "200");
chanceOfImage.setAttribute("height", "200");


const mainCityWeather = (weatherData) => {
     mainArticle.prepend(chanceOfImage)
  const mainCityHeading = document.querySelector("#cityHeading");
  const mainCityArea = document.querySelector("#cityArea");
  const mainCityRegion = document.querySelector("#cityRegion");
  const mainCityCountry = document.querySelector("#cityCountry");
  const mainCityFeels = document.querySelector("#cityFeels");

  const chanceOfRain = document.querySelector("#rain");
  const chanceOfSnow = document.querySelector("#snow");
  const chanceOfSunny = document.querySelector("#sunny");

  mainCityHeading.textContent = cityName;
  mainCityArea.textContent = `Area: ${weatherData.nearest_area[0].areaName[0].value}`;
  mainCityRegion.textContent = `Region: ${weatherData.nearest_area[0].region[0].value}`;
  mainCityCountry.textContent = `Country: ${weatherData.nearest_area[0].country[0].value}`;
  mainCityFeels.textContent = `Currently: Feels Like ${weatherData.current_condition[0].FeelsLikeF}°F`;
  chanceOfRain.textContent = `Chance of rain: ${weatherData.weather[0].hourly[0].chanceofrain}`;
  chanceOfSnow.textContent = `Chance of snow: ${weatherData.weather[0].hourly[0].chanceofsnow}`;
  chanceOfSunny.textContent = `Chance of sunshine: ${weatherData.weather[0].hourly[0].chanceofsunshine}`;

  // chance of
  let sun = weatherData.weather[0].hourly[0].chanceofsunshine;
  let rain = weatherData.weather[0].hourly[0].chanceofrain;
  let snow = weatherData.weather[0].hourly[0].chanceofsnow;
  
  let mainChanceOfImage = (sun, rain, snow) => {
    let chanceOfImage = document.querySelector('#chance-img');
  console.log(chanceOfImage, sun, snow, rain);
    if (sun > 50) {
        chanceOfImage.setAttribute("src", "assets/icons8-summer.gif");
        chanceOfImage.setAttribute("alt", "Sunshine!");

    } else if (snow > 50) {
        chanceOfImage.setAttribute("src", "assets/icons8-light-snow.gif");

        chanceOfImage.setAttribute("alt", "Snow!");
    } else if (rain > 50) {
        chanceOfImage.setAttribute("src", "assets/icons8-rain-cloud.gif");

        chanceOfImage.setAttribute("alt", "Rain!");
    } else {
      chanceOfImage.setAttribute("src", "./assets/icons8-night.gif");

      chanceOfImage.setAttribute("alt", "normal");
    }
  };
  mainChanceOfImage(sun, rain, snow);
  forecastWeather(weatherData);
  generateHistory(weatherData);
};

// today tomorrow & day after

//today- variables & appends
const todayCard = document.getElementById("today");
const todayArticle = document.createElement("article");
const today = document.createElement("h4");
const todayAverageTemp = document.createElement("p");
const todayMaxTemp = document.createElement("p");
const todayMinTemp = document.createElement("p");

todayArticle.setAttribute('id', 'today-article');
today.setAttribute('id', 'today-h4');
todayAverageTemp.setAttribute('id', 'today-avg-temp');
todayMaxTemp.setAttribute('id', 'today-max-temp');
todayMinTemp.setAttribute('id', 'today-min-temp');

today.after(todayAverageTemp, todayMaxTemp, todayMinTemp);
todayCard.append(todayArticle);
todayArticle.append(today);

// tomorrow - variables, attributes & appends
const tomorrowCard = document.getElementById("tomorrow");
const tomorrowArticle = document.createElement("article");
const tomorrowAverageTemp = document.createElement("p");
const tomorrowMaxTemp = document.createElement("p");
const tomorrowMinTemp = document.createElement("p");
const tomorrow = document.createElement("h4");

 tomorrowArticle.setAttribute('id', 'tomorrow-article');
 tomorrowAverageTemp.setAttribute('id', 'tomorrow-avg-temp');
 tomorrowMaxTemp.setAttribute('id', 'tomorrow-max-temp');
 tomorrowMinTemp.setAttribute('id', 'tomorrow-min-temp');
 tomorrow.setAttribute('id', 'tomorrow-h4');

tomorrowCard.append(tomorrowArticle);
tomorrowArticle.append(tomorrow);
tomorrow.after(tomorrowAverageTemp, tomorrowMaxTemp, tomorrowMinTemp);


  //day after tomorrow
  const dayAfterCard = document.getElementById("day-after");
  const dayAfterArticle = document.createElement("article");
  const dayAfter = document.createElement("h4");
  const dayAfterAverageTemp = document.createElement("p");
  const dayAfterMaxTemp = document.createElement("p");
  const dayAfterMinTemp = document.createElement("p");

  dayAfterCard.setAttribute('id', 'day-after');
  dayAfterArticle.setAttribute('id', 'day-after-article');
  dayAfter.setAttribute('id', 'day-after-h4');
  dayAfterAverageTemp.setAttribute('id', 'day-after-avg-temp');
  dayAfterMaxTemp.setAttribute('id', 'day-after-max-temp');
  dayAfterMinTemp.setAttribute('id', 'day-after-min-temp');

  dayAfterCard.append(dayAfterArticle);
  dayAfterArticle.append(dayAfter);
  dayAfter.after(dayAfterAverageTemp, dayAfterMaxTemp, dayAfterMinTemp);


const forecastWeather = (weatherData) => {
  const weather = document.querySelector("#weather");
  //today
  const todayCard = document.querySelector("#today");
  const todayArticle = document.querySelector('#today-article');
  const today = document.querySelector('#today-h4');
  const todayAverageTemp = document.querySelector('#today-avg-temp');
  const todayMaxTemp = document.querySelector('#today-max-temp');
  const todayMinTemp = document.querySelector('#today-min-temp');

  today.textContent = `Today`;
  todayAverageTemp.textContent = `Average Temperature: ${weatherData.weather[0].avgtempF}°F`;
  todayMaxTemp.textContent = `Max Temperature: ${weatherData.weather[0].maxtempF}°F`;
  todayMinTemp.textContent = `Min Temperature: ${weatherData.weather[0].mintempF}°F`;
  console.log(todayCard);

  //tomorrow
  const tomorrowCard = document.querySelector("#tomorrow");
  const tomorrowArticle = document.querySelector("#tomorrow-article");
  const tomorrowAverageTemp = document.querySelector("#tomorrow-avg-temp");
  const tomorrowMaxTemp = document.querySelector("#tomorrow-max-temp");
  const tomorrowMinTemp = document.querySelector("#tomorrow-min-temp");
  const tomorrow = document.querySelector("#tomorrow-h4");

  tomorrow.textContent = `Tomorrow`;
  tomorrowAverageTemp.textContent = `Average Temperature: ${weatherData.weather[1].avgtempF}°F`;
  tomorrowMaxTemp.textContent = `Max Temperature: ${weatherData.weather[1].maxtempF}°F`;
  tomorrowMinTemp.textContent = `Min Temperature: ${weatherData.weather[1].mintempF}°F`;

  //day after tomorrow

  const dayAfterCard = document.document.querySelector("#day-after");
  const dayAfterArticle = document.document.querySelector("#day-after-article");
  const dayAfter = document.querySelector("#day-after-h4");
  const dayAfterAverageTemp = document.querySelector("#day-after-avg-temp");
  const dayAfterMaxTemp = document.querySelector("#day-after-max-temp");
  const dayAfterMinTemp = document.querySelector("#day-after-min-temp");

  dayAfterAverageTemp.textContent = `Average Temperature: ${weatherData.weather[2].avgtempF}°F`;
  dayAfterMaxTemp.textContent = `Max Temperature: ${weatherData.weather[2].maxtempF}°F`;
  dayAfterMinTemp.textContent = `Min Temperature: ${weatherData.weather[2].mintempF}°F`;
  dayAfter.textContent = `Day After Tomorrow`;

 
};

//history- previous Searches

const generateHistory = (weatherData) => {
  historyList.removeAttribute("hidden");
  if (document.getElementById("no-search")) {
    document.getElementById("no-search").remove();
  }
  let locationSearch = cityName;
  if (!locationSearch) {
    location = document.querySelector("#cityArea");
    console.log(location);
  }
  if (cityName === location) {
    location = document.querySelector("#cityRegion");

    const cityLi = document.createElement("li");

    let cityLiAnchor = document.createElement("a");
    cityLiAnchor.textContent +=
      cityName + ` ${weatherData.weather[0].avgtempF}°F`;
    cityLiAnchor.setAttribute(
      "href",
      `javascript:weatherData('${locationSearch}')`
    );

    cityLi.append(cityLiAnchor);
    historyList.append(cityLi);
  } else {
    console.log("");
  }
};

//convert widget
let convertWidgetForm = document.getElementById("tempWidget");
convertWidgetForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (document.getElementById("to-c").checked) {
    let convertedTemp = (convertWidgetForm.temp.value - 32) / 1.8;
    document.getElementById("result").textContent = `${convertedTemp.toFixed(
      2
    )}º Celsius`;
    console.log("To celsius");
  } else {
    let convertedTemp = convertWidgetForm.temp.value * 1.8 + 32;
    document.getElementById("result").textContent = `${convertedTemp.toFixed(
      2
    )}º Fahrenheit`;
    console.log("To F");
  }
});
