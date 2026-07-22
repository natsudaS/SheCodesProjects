// Global variables
let city = document.querySelector("h1#city");
let temp_span = document.querySelector("span#temp");
let desc_span = document.querySelector("span#desc");
let icon_img = document.querySelector("img#icon");
let humidity_span = document.querySelector("span#humidity");
let wind_span = document.querySelector("span#wind");
let apiKey = "373bf32o76t9d30da8a5693c914460f3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.innerHTML}&key=${apiKey}&units=metric`;


// Aktuelles Datum anzeigen
function showCurrentDate(){
  console.log("showCurrentDate() called");
  let now = new Date();
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August","September","October", "November", "December"];
  let day = weekdays[now.getDay()];
  let day_span = document.querySelector("span#weekday");
  let date_span = document.querySelector("span#date");
  let time_span = document.querySelector("span#time");
  
  date_span.innerHTML = `${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;
  day_span.innerHTML = day;
  time_span.innerHTML = `${now.getHours()}:${now.getMinutes()}`;
}

showCurrentDate();


// Aktuelle Temperatur, Wetterbeschreibung und Icon anzeigen
function showCurrentWeather(response){
  console.log("showCurrentWeather() called");
  console.log(response);
  let temperature = response.data.temperature.current;
  let weather_description = response.data.condition.description; 
  let weather_icon = response.data.condition.icon_url; 
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  console.log(temperature, weather_description, humidity, wind); 
  temp_span.innerHTML = Math.round(temperature)+' °C';
  desc_span.innerHTML = weather_description;
  icon_img.src = weather_icon;
  humidity_span.innerHTML = humidity + ' %';
  wind_span.innerHTML = wind + ' km/h';
  console.log(response.data);
}

axios.get(apiUrl).then(showCurrentWeather);


// Suchfunktion für Städte
function searchCity(event){
  console.log("searchCity() called");
  event.preventDefault();

  let searchBar = document.querySelector("input#search-bar");
  let request = document.querySelector("input#search-bar").value;

  console.log(city.innerHTML);
  city.innerHTML = request;
  searchBar.value = "";
  console.log(city.innerHTML);
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${request}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let submit_btn = document.querySelector("button#search");
submit_btn.addEventListener("click", searchCity);

