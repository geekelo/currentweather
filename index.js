const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', function(req, res){


  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){



const city = req.body.city;

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=bc1e16460f71af28d6aa3be71c6ff7d6&units=metric"
https.get(url, function(response){

const status = response.statusCode
if (status == 404){
  res.send("City not found")
 }
 else {

response.on("data", function(data){
 const weatherdata = JSON.parse(data)
 const temperature = weatherdata.main.temp;
 const description = weatherdata.weather[0].description
 
res.write(` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

</head>
<body><div class="jumbotron jumbotron-fluid">
<div class="container">
  <h1 class="display-4">The temperature at ${city} is ${temperature} and it is ${description}</h1>
  <p class="lead">Thank you for using our service</p>
</div>
</div>
</body>
</html>`)
//   res.write(`<h1 >The temperature at ${city} is ${temperature} and it is ${description}</h1>`)
//  res.write("<p>Thank you for using our service</p>")
 


  res.send();
})
 }


})




})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started ooooo")
})




