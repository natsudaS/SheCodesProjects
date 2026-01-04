// Global variables
let city = document.querySelector("h1#city");
let temp_span = document.querySelector("span#temp");
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


// Aktuelle Temperatur anzeigen
function showCurrentTemp(response){
  console.log("showCurrentTemp() called");
  let temperature = response.data.temperature.current;
  console.log(temperature); 
  temp_span.innerHTML = Math.round(temperature)+' °C';
  console.log(response.data);
}

axios.get(apiUrl).then(showCurrentTemp);


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
  axios.get(apiUrl).then(showCurrentTemp);
}

let submit_btn = document.querySelector("button#search");
submit_btn.addEventListener("click", searchCity);

// Temperatur in Celsius und Fahrenheit umrechnen
let cels_span = document.querySelector("span#cels");
let fahr_span = document.querySelector("span#fahr");
let celsCounter = 1;
let fahrCounter = 0;

function convertToCelsius(){
  console.log("convertToCelsius() called");
  if(celsCounter < 1){
    cels_span.style.fontWeight = 500;
    fahr_span.style.fontWeight = 300;
    temp_span.innerHTML = Math.round((temp_span.innerHTML-32)*5/9);
    fahrCounter = 0;
  }

  celsCounter += 1;
}

function convertToFahrenheit(){ 
  console.log("convertToFahrenheit() called");
  if(fahrCounter < 1){
    cels_span.style.fontWeight = 300;
    fahr_span.style.fontWeight = 500;
    temp_span.innerHTML = Math.round(temp_span.innerHTML*9/5+32);
    celsCounter = 0;
  }
  fahrCounter += 1;
}

cels_span.addEventListener("click", convertToCelsius);
fahr_span.addEventListener("click", convertToFahrenheit);