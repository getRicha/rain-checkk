
# Rain Check

Rain Check is a fully functional weather app that shows the utilizes geolocation and reverse geocoding to display weather conditions to the user for the current day. It also provides a forecast of maximum and minumum temperatures for the following 7 days. It is based on the OpenWeatherMap API.

## Environment Variables

Rain-Check uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data and perform reverse geocoding. To run this app, you'll need an API key. This is entirely free. To do so :

    1. Sign up for a free account and get your OpenWeatherMap API key.
    2. Open the project, and go to the .env file.
    3. Set API_KEY = YOUR_API_KEY

## Run Locally

Clone the project

```bash
  git clone https://github.com/getRicha/rain-checkk.git
```

Go to the project directory

```bash
  cd rain-checkk
```

Install dependencies

```bash
  npm install
```

To run this project, you will need to add the `API_KEY` environment variable to your .env file


Start the server

```bash
  node server.js
```


## Screenshots

For current location-
![](https://github.com/getRicha/rain-checkk/blob/main/demo/lko_w.png)

For searched location-
![](https://github.com/getRicha/rain-checkk/blob/main/demo/bengaluru_w.png)

## Tech Stack

**Client:** HTML5, CSS3, JavaScript

**Server:** Node, Express


## Contributing

Contributions are always welcome!
Feel free to contribute to this very basic project.
