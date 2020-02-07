const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
//to restart server when both hbs and js file changes, nodemon .\src\app.js -e js,hbs
const app = express()

//Define paths for Express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views lcoation
app.set('view engine','hbs')// to create dynmamic template
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))//setup static directory to serve

app.get('',(req,res)=>{
    res.render('index',{// to show index hbs file
        title:'Hava Durumu',
        name:'Furkan Çabuk'
    }) 
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Hakkımda',
        name:'Furkan Çabuk',
        university:'Istanbul Technical University',
        info:'Computer Science Student'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Yardım',
        name: 'Furkan Çabuk',
        help:'Sorularınıza cevap bulmak için mail atabilirsiniz.',
        mail:'cabukf16@itu.edu.tr'
    })
})
//endpoint
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide and address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
        if(error){
           return res.send({error})
           //return will stop function execeution no need to else block
        }
        forecast(latitude, longitude, (error, {summary,temperatureLow,temperatureHigh}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:summary,
                location:location,
                temperatureHigh:temperatureHigh,
                temperatureLow:temperatureLow
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Furkan Çabuk',
        errorMessage:'Help article not found'
    })
})

//* match anything that didnt matched so far,so this should come last
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Furkan Çabuk',
        errorMessage:'page not found'
    })
})

//start the server up 
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})