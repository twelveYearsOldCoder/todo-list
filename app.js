const express = require("express");
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var currentDay = new Date().getDay();
var day = weekday[currentDay];

app.get("/", (req, res)=>{
//key: value
res.render('list', {day: day});
});
app.listen(3000, ()=>{
    console.log("server started at  port 3000");
})