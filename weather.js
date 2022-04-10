const BASE_URL = "http://wttr.in/";
const format = "?format=j1";
let city = "";
let weatherData;
fetch(`${BASE_URL}${city}${format}`)
.then(response => response.json())
.then(result => {
    weatherData = result;
})
.catch(error => console.log(error))
