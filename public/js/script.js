let weather = {

    fetchCoords: async function(city){
        const response = await fetch(`coords/${city}`)
        const data = await response.json()
        this.fetchWeather(data[0].lat,data[0].lon,city)
    },

    fetchWeather: async function(lat,lon,city){
        const res = await fetch(`weather/${lat},${lon}`)
        const data = await res.json()
        this.displayWeather(data,city)
    },

    displayWeather: function(data,city){
        // Current Weather
        const {icon, description} = data.current.weather[0]
        const {temp,humidity,pressure,wind_speed,sunrise,sunset} = data.current
        const timeZone = data.timezone
        document.getElementById('time-zone').innerHTML = timeZone
        document.getElementById('country').innerHTML = data.lat + '°N, ' + data.lon+'°E'
        document.querySelector('.city').innerText = 'Weather in '+ city
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`
        document.querySelector('.description').innerText = description
        document.querySelector('.temp').innerText = temp + "°C"
        document.querySelector('.humidity').innerText = `${humidity}%`
        document.querySelector('.pressure').innerText = `${pressure}hPa`
        document.querySelector('.wind-speed').innerText = `${wind_speed} m/s`
        document.querySelector('.sunrise').innerText = window.moment(sunrise*1000).format('HH:mm a')
        document.querySelector('.sunset').innerText = window.moment(sunset*1000).format('HH:mm a')
        document.querySelector('.weather').classList.remove('loading')
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + encodeURIComponent(description) + "')"

        // Weather Forecast
        document.querySelectorAll('.weather-forecast-item').forEach((item, idx) => {
            const {icon, description} = data.daily[idx].weather[0]
            const {min, max} = data.daily[idx].temp
            item.querySelector('.day').innerText = window.moment(data.daily[idx].dt*1000).format('ddd')
            item.querySelector('.min').innerText = `Min - ${min}°C`
            item.querySelector('.max').innerText = `Max - ${max}°C`
            item.querySelector('.w-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`
            item.querySelector('.w-icon').title = description
        })
    },

    search: function () {
        this.fetchCoords(document.querySelector(".search-box").value);
    }
}

document.querySelector('.search button').addEventListener('click', ()=>{
    weather.search()
})

document.querySelector(".search-box").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
})

navigator.geolocation.getCurrentPosition((success) => {
    let {latitude, longitude } = success.coords
    fetch(`city/${latitude},${longitude}`)
        .then((response) => response.json())
        .then((data) => {
            weather.fetchWeather(latitude,longitude,data[0].name)
        })
})