var request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
 res.render('index');
});
app.post('/',function(req,res){
    let city = req.body.city;
    let apikey = "9bd3e01d0dc97a9e3cca1c8192bcd541";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                // console.log(weatherText);
                res.render('index', {weather: weatherText, error: null});
            } 
        }
        else{
            console.log(error);
        }
    });
});
app.listen(3000, function () {
  console.log('Weather app listening!');
});