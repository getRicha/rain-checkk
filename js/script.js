const timeElement = document.getElementById('time')
const dateElement = document.getElementById('date')
const currentWeatherElements = document.getElementById('current-weather-items')
const timeZone = document.getElementById('time-zone')
const countryElement = document.getElementById('country')
const weatherForecast = document.getElementById('weather-forecast')
const currentTemp = document.getElementById('current-temp')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const API_KEY = 'dd415862a06d3af615ab89a3a86faae6'

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour%12 : hour
    const minutes = time.getMinutes();
    const ampm = hour>=12 ? 'PM' : 'AM'

    timeElement.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id='am-pm'>${ampm}</span>`

    dateElement.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000)

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
    let {latitude, longitude } = success.coords;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => showWeatherData(data))
    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timeZone.innerHTML = data.timezone;
    countryElement.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherElements.innerHTML = 
    `<div class="weather-item">
        <span>Humidity</span>
        <span>${humidity}</span>
    </div>
    <div class="weather-item">
        <span>Pressure</span>
        <span>${pressure}</span>
    </div>
    <div class="weather-item">
        <span>Wind Speed</span>
        <span>${wind_speed}</span>
    </div>
    <div class="weather-item">
        <span>Sunrise</span>
        <span>${window.moment(sunrise * 1000).format('HH:mm a')}</span>
    </div>
    <div class="weather-item">
        <span>Sunset</span>
        <span>${window.moment(sunset*1000).format('HH:mm a')}</span>
    </div>`

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTemp.innerHTML = 
            `<img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <span class="day">${window.moment(day.dt*1000).format('dddd')}</span>
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>`

        }else{
            otherDayForcast += 
            `<div class="weather-forecast-item">
                <span class="day">${window.moment(day.dt*1000).format('ddd')}</span>
                <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>`
        }
    })


    weatherForecast.innerHTML = otherDayForcast;
}