let id = (id)=> document.getElementById(id);
let classes = (classes)=> document.getElementsByClassName(classes);

let differentUnit = (value,unit)=>{
    id("currentTemp").innerHTML = value.temp + unit;
    id("fellsLike").innerHTML = value.feels_like + unit;
    id("minTemp").innerHTML = value.temp_min + unit;
    id("maxTemp").innerHTML = value.temp_max + unit;
}

let displayData = (data,city,unit)=>{
    const {weather,main,windSpeed,country,hourly} = data;

    id("cityName").innerHTML = city+", " + country;
    id("mainWeather").innerHTML = weather[0].main;
    id("weatherDescription").innerHTML = weather[0].description;
    id("timeDescription").innerHTML = "weather today in "+city+", " + country;
    classes("weather-img")[0].setAttribute("src","http://openweathermap.org/img/wn/"+weather[0].icon+"@4x.png");
    id("humidity").innerHTML = main.humidity + "%";

    for(let i=0;i<3;i++){
        classes("hourly-img")[i].setAttribute("src","http://openweathermap.org/img/wn/"+hourly[i].icon+"@2x.png");
    }

    if(unit ==="Kelvin"){
        id("windSpeed").innerHTML = windSpeed +" m/s";
        differentUnit(main,"&#8490;");
        for(let i=0;i<3;i++){
            classes("hourly-temp")[i].innerHTML = hourly[i].temp + "&#8490;";
        }
    }else if(unit === "Fahrenheit"){
        id("windSpeed").innerHTML = windSpeed +" mph";
        differentUnit(main,"&#8457;");
        for(let i=0;i<3;i++){
            classes("hourly-temp")[i].innerHTML = hourly[i].temp + "&#8457;";
        }
    }else if(unit === "Celsius"){
        id("windSpeed").innerHTML = windSpeed +" m/s";
        differentUnit(main,"&#8451;");
        for(let i=0;i<3;i++){
            classes("hourly-temp")[i].innerHTML = hourly[i].temp + "&#8451;";
        }
    }else{
        id("lastUpdated").innerHTML = "Something Went Wrong";
    }


}


window.addEventListener('load', ()=>{
    const params = (new URL(document.location)).searchParams;
    const city = params.get('city');
    const unit = params.get('unit');
    
    let time = new Date().toLocaleTimeString();

    if(city && unit){
        id("lastUpdated").innerHTML = "Last updated "+time;
        fetch("https://pacific-garden-17772.herokuapp.com/weather?city="+city+"&unit="+unit)
        .catch(err=>{id("lastUpdated").innerHTML = "Something Went Wrong";})
        .then((res)=>res.json())
        .then((res)=>displayData(res,city,unit));

    }else{
        console.log("here");
        id("lastUpdated").innerHTML = "Something Went Wrong";
    }
});