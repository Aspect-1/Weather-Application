const request = require('request')

const forecast = (latitude, longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a76e84f9e312d76e30b87e2eded9c5a8&query='+latitude+','+longitude //weatherstack' api
    request({url:url, json:true},(error,response) => {
        if(error){
            callback('Unable to connect',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] +'. It is currently '+ response.body.current.temperature+' but it feels like '+ response.body.current.feelslike)  
        }
    })
}

module.exports = forecast