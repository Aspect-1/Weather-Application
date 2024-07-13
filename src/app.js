//Example of express and hbs 
const path = require('path')
const express = require('express')
const hbs = require('hbs')//alternative to ejs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000//process.env.PORT is ther port heroku is listening to.

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //register partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amrit Pandey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amrit Pandey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'God helps those who help themselves.',
        title: 'Help',
        name: 'Amrit Pandey'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address term'
        })
    }
   
    else{
        geocode(!req.query.address,(error, data={}) =>{ //using mapbox to get lat,lon and loc. We are recieving in data
            // console.log(data.longitude);
            // console.log(data.latitude);
            // console.log(data.location);
            if(error){
                return res.send({error})
            }
            else{
                forecast(data.latitude,data.longitude,(error,forcastData)=>{
                    if(error){
                        return res.send({error})
                    }
                    res.send({
                        location:data.location,
                        forecast:forcastData
                        
                    })
                })
            }
        })
    }
})

app.get('/products', (res, req)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
})

app.get('/help/*', (req, res) => {//for /help/anything (404.hbs)
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => { //anything except the above
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})