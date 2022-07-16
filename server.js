const fetch = require('node-fetch')
const express = require('express')
const app = express()
const PORT = 3000
require('dotenv').config()

const API_KEY = process.env.API_KEY;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/index.html')
})

app.get('/coords/:city',async (req,res) => {
    const city = req.params.city
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    const data = await response.json()
    res.json(data)
})

app.get('/city/:coords',async (req,res) => {
    const coords = req.params.coords.split(',')
    const api_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords[0]}&lon=${coords[1]}&limit=1&appid=${API_KEY}`
    const data = await fetch(api_url)
    const jsonData = await data.json()
    res.json(jsonData)
})

app.get('/weather/:latlon',async (req,res) => {
    const latlon = req.params.latlon.split(',')
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latlon[0]}&lon=${latlon[1]}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    const data = await fetch(api_url)
    const jsonData = await data.json()
    res.json(jsonData)
})

app.get('*',(req,res) => {
    res.render('404.ejs',{
        error: '404',
        title : 'Page not found'
    })
})

app.listen(PORT || process.env.PORT,() => console.log(`Listening on port ${PORT}`))