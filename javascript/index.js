let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let queryselector = (query) => document.querySelector(query);


// to get current location
function GetCoordinate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(GetLocation);
      
    }
}

const GetLocation = (location) =>{
  id("city-load").style.display = "initial";
  const {latitude,longitude} = location.coords;

  fetch("https://pacific-garden-17772.herokuapp.com/location?coords="+latitude+"+"+longitude)
  .catch( (err) => {id("city-load").style.display = "none";})
  .then((res)=>res.json())
  .then((data)=> {
    if(!data.error){
      cityName(data.city);
    }
  });
}

const cityName = (cityName) =>{
  id("text-area").setAttribute("value",cityName);
  id("city-load").style.display = "none";
}

window.addEventListener('load',()=>{
  GetCoordinate();
});

// showing latest weather

let updateTime = ()=>{
  var hr = new Date().getHours();
  var min = new Date().getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if( hr > 12 ) {
    hr -= 12;
    ampm = "pm";
  }

  classes("last-refreshed")[0].innerHTML = "Last updated at " + hr + ":" + min + ampm
  
}

let updateData = (enteredcity, unit, data)=>{

  const {weather,main,visibility,windSpeed,country} = data;

  // updating location
  classes("city-details")[0].innerHTML = "Weather today in "+ enteredcity +", " + country;
  
  // updating time
  updateTime();

  // updating data
  classes("weather-img")[0].setAttribute("src", "http://openweathermap.org/img/wn/"+weather[0].icon+"@4x.png");
  classes("weather-type")[0].innerHTML = weather[0].main;
  classes("weather-description")[0].innerHTML = weather[0].description;
  id("current-temp").innerHTML = main.temp;
  id("feels-like").innerHTML = main.feels_like;
  id("max-temp").innerHTML = main.temp_min;
  id("min-temp").innerHTML = main.temp_max;
  id("humidity").innerHTML = main.humidity;
  id("pressure").innerHTML = main.pressure;
  id("wind-speed").innerHTML = windSpeed;
  id("visibility").innerHTML = visibility;


  // updating degrees
  for(i=0; i<5; i++){
    if (unit === "Kelvin") {
      if(i === 4){
        classes("variableDegree")[i].innerHTML = "m/s";
      }else{
        classes("variableDegree")[i].innerHTML = "&#8490;"
      }
    } else if (unit === "Fahrenheit") {
       if(i === 4){
        classes("variableDegree")[i].innerHTML = "mph";
      }else{
        classes("variableDegree")[i].innerHTML = "&#8457;"
      }
    } else if (unit === "Celsius") {
      if(i === 4){
        classes("variableDegree")[i].innerHTML = "m/s";
      }else{
        classes("variableDegree")[i].innerHTML = "&#8451;"
      } 
    }else{
      if(i === 4){
        classes("variableDegree")[i].innerHTML = "m/s";
      }else{
        classes("variableDegree")[i].innerHTML = "&#8490;"
      }
    }
  }

  // displaying content
  id("form-section").style.display = "none";
  id("Weather-data-section").style.display = "block";
}

let getWeather = (enteredcity,unit) =>{
  fetch("https://pacific-garden-17772.herokuapp.com/weather?city="+enteredcity+"&unit="+unit)
  .catch( (err)=>{id("submit-load").style.display = "none";
                      classes("error")[0].innerHTML = "An error occured!!!";
                      classes("error")[0].style.display = "block";
  })
  .then((res)=>res.json())
  .then((data)=> {if(!data.error){
      updateData(enteredcity,unit,data)
    }else{
      id("submit-load").style.display = "none";
      classes("error")[0].innerHTML = "An error occured!!!";
      classes("error")[0].style.display = "block";
    }

  });
}


classes("input-button")[0].addEventListener('click', ()=>{
  
  // saving value entered by user in a variable
  let enteredcity = id("text-area").value;
  if(enteredcity){
    id("submit-load").style.display = "initial";
    classes("error")[0].style.display = "none";
    let unit = queryselector("input[name='unit']:checked").value;
    getWeather(enteredcity,unit);

  }else{
    classes("error")[0].innerHTML = "please enter city name!!!";
    classes("error")[0].style.display = "block";
  }
});