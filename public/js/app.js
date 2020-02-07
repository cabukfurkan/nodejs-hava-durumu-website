//get the data from client side
//make the http req from clent side
const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
let enteredLocation = document.querySelector('#location')
let forecastResult=document.querySelector('#forecast')
let minDegree=document.querySelector('#min-degree')
let maxDegree=document.querySelector('#max-degree')
let bgImage=document.querySelector('.main-content')
document.body.style.backgroundImage = "url('../img/leaves.gif')";

const wind = new Audio()
const birds = new Audio()
wind.src='../audio/cold-wind.mp3'
birds.src='../audio/birds.mp3'
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            forecastResult.textContent=data.error
        }else{
            forecastResult.textContent=data.forecast
            minDegree.textContent='Gün içi min sıcaklık '+Math.round(data.temperatureLow)+' derece'
            maxDegree.textContent='Gün içi max sıcaklık '+Math.round(data.temperatureHigh)+' derece'
            enteredLocation.textContent=data.location
            
            if(data.temperatureHigh<25){
                if(birds){
                    birds.pause()
                    wind.play()
                }else{
                    wind.play()
                }
                 
            }else{
                if(wind){
                    wind.pause()
                    birds.play()
                }
                birds.play()
            }
        }
    })
})
})

//show date

function showTime(){
    let date = new Date();
    let hours =date.getHours();
    let minutes =date.getMinutes();
    let seconds =date.getSeconds();
    let day =date.getDate();
    let month=date.getMonth()+1;
    let year=date.getFullYear();
    // let formatHours = convertFormat(hours)

    // hours = checkTime(hours)

    hours = addZero(hours)
    minutes = addZero(minutes)
    seconds = addZero(seconds)
    day = addZero(day)
    month=addZero(month)

    document.getElementById('clock').innerHTML = `${hours} : ${minutes} : ${seconds}  -  ${day}/${month}/${year}`
}

function convertFormat(time){
    let format ='AM'
    if(time >=12){
        format ='PM'
    }
    return format
}

function checkTime(time){
    if(time > 12){
        time =time -12;
    }
    if(time===0){
        time=12;
    }
    return time
}

function addZero(time){
if(time<10){
    time="0" + time;
}
return time
}

setInterval(showTime,0)

//quotes-------------------------------------------------------

const quoteArray = [
    {
        quote:'Baktın ki kar havası, eve gel kör olası.'
    },
    {

        quote:'Hakkın işine, dağın karına karışılmaz.'
    },
    {
        quote:'Kar ne kadar çok yağsa yaza kalmaz.'
    },
    {

        quote:'Allah dağına göre kar verir.'
    },
    {
        quote:'Kar yılı var yılı'
    },
    {

        quote:'Dumanlı dağlar yağmursuz kalmaz.'
    },
    {
        quote:'Çiftçiye yağmur, yolcuya kurak; cümlenin muradını verecek Hak.'
    },
    {

        quote:'Rüzgarın ardı yağış, şakanın ardı döğüş.'
    },
    {
        quote:'Abanın kadri yağmurda bilinir.'
    },
    {

        quote:'İşini kış tut da yaz çıkarsa bahtına.'
    },
    {
        quote:'Mart çıkmadıkça dert çıkmaz.'
    },
    {

        quote:'Yazın başı pişenin kışın aşı pişer.'
    },
    {
        quote:'Her zaman gemicinin istediği rüzgar esmez.'
    }
]


const quoteDisplayerBtn = document.querySelector('#quoteDisplayerBtn');
const quote = document.querySelector('#quote');

quoteDisplayerBtn.addEventListener('click', displayQuote);

function displayQuote(){
    let number = Math.floor(Math.random()*quoteArray.length)
    quote.innerHTML = quoteArray[number].quote;
}