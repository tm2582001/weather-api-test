let id = (id) => document.getElementById(id);

function GetCoordinate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(GetLocation);
    }
}

const GetLocation = (location) =>{
  const {latitude,longitude} = location.coords;

  fetch("https://pacific-garden-17772.herokuapp.com/location?coords="+latitude+"+"+longitude)
  .then((res)=>res.text())
  .then(data);
}

const data = (data) =>{
  id("text-area").setAttribute("value",data);
}

GetCoordinate();

