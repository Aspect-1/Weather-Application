const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW1yaXQ2MTkiLCJhIjoiY2w0MDdiZzJ3MDVmaTNrbzZ0ejM2MDg4NyJ9.PIflytDraOoENhSIK7Toxw'

    request({url:url, json:true},(error,response) => {//making request to mapbox's api and getting a 'response' in json form
        if(error){
            callback('Unable to connect',undefined)//return these values
        }else if(response.body.error){
            callback('Unable to find location',undefined);//return these values
        }else{
            callback(undefined, {                       //return these values
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
                
            })
            
        }
    })
}

module.exports = geocode