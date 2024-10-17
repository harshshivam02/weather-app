
const API_KEY="95413ec44e3f4c74be741815cb2c5d76";
const url="https://api.weatherbit.io/v2.0/current";

const submitcity=document.getElementById("weather-search")


const imageicon=document.getElementById("weather-icon");
const iconurl="https://cdn.weatherbit.io/static/img/icons/";
const temprature=document.getElementById("temprature");
const desc=document.getElementById("description");
const city=document.getElementById("city-name");
const wind=document.getElementById("wind-speed");
const humidity = document.getElementById("humidity-value");




function displayweather(data){
    console.log(data);
    const icon = data?.data[0]?.weather?.icon || '';
    const description = data?.data[0]?.weather?.description || '';
    const city_name = data?.data[0]?.city_name || '';
    const aqi = data?.data[0]?.aqi || '';
    const temp = data?.data[0]?.temp || '';
    console.log(temp);
    
    const rh = data?.data[0]?.rh || '';
    const wind_spd = data?.data[0]?.wind_spd || '';
    const wind_cdir_full = data?.data[0]?.wind_cdir_full || '';

    const src1 = `${iconurl}${icon}.png`;
    console.log(src1);

    imageicon.setAttribute("src", src1);

    if(temp==null) {
        temprature.innerText = `Loading....`;  
    }
    else{
        temprature.innerText = `${temp} °C`;
    }
   
    desc.innerHTML = description;
    city.innerText = city_name;
    wind.innerText = ` ${wind_spd} M/s,  ${wind_cdir_full}`;
    humidity.innerText = ` ${rh}%`;




    
}

function searchcity(event){
    event.preventDefault();  
    const city=document.getElementById("cityname").value;
    fetch(`${url}?city=${city}&key=${API_KEY}`)
     .then(response=>response.json())
     .then(response=>displayweather(response))
     .catch(error => console.error('Error fetching weather data:', error));
   
}

submitcity.addEventListener("submit",searchcity);

// Get the current location

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(`${url}?lat=${latitude}&lon=${longitude}&key=${API_KEY}`)
     .then(response=>response.json())
     .then(response=>displayweather(response))
     .catch(error => console.error('Error fetching weather data:', error));
}
function err(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,err);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

const btnGeolocation=document.getElementById("current");

btnGeolocation.addEventListener("click",getLocation);
