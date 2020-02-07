const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d6bc1f1995f86e0893703a9e36ec41fb/'+latitude+','+longitude+'?lang=tr&units=si'

    request({url,json:true},(error,response)=>{

        if(error){
            callback('Unable to connect to darksky.net',undefined)
        }else if(response.body.error){
            callback('Poor request, check your request and try again',undefined)
        }else{
            callback(undefined,{
                summary: response.body.daily.data[0].summary,
                temperatureHigh: response.body.daily.data[0].temperatureHigh,
                temperatureLow: response.body.daily.data[0].temperatureLow
            
            })
        }
    })
}

module.exports=forecast