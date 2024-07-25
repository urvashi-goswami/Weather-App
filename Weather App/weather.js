let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_foreCast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temp");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp = document.querySelector(".weather_max");

let w_humidity = document.querySelector(".weather_humidity");
let w_feelsLike = document.querySelector(".weather_feelslike");
let w_pressure = document.querySelector(".weather_pressure");
let w_wind = document.querySelector(".weather_wind");

let citySerach = document.querySelector(".weather_search");


// api id =  8f7ff3e25d2dc20e61678c57e2107977

// to get the actual  country name :
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

//to get the date and time
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    console.log(curDate)

    const option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
    const formatter = new Intl.DateTimeFormat("en-US", option);

    return formatter.format(curDate);
};

let city = "surat";

//search functionality
citySerach.addEventListener("submit" , (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "" ;
})



const getWeatherData = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8f7ff3e25d2dc20e61678c57e2107977`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_foreCast.innerHTML = `${weather[0].main}`;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_temp.innerHTML = `${main.temp}&#176`;
        w_minTemp.innerHTML = `Min : ${main.temp_min.toFixed()}&#176`;
        w_maxTemp.innerHTML = `Max : ${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity.toFixed(2)}&#176`;
        w_wind.innerHTML = `${wind.speed}&#176`;
        w_pressure.innerHTML = `${main.pressure}&#176`;

    }
    catch (error) {
        console.log(error);
    }
}

document.body.addEventListener("load", getWeatherData());