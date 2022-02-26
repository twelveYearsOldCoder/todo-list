const express = require("express");
const app = express();
const ejs = require("ejs");
const { urlencoded } = require("express");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
var listItem = [];
var workListItem = [];

/*
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentDay = new Date().getDay();
var day = weekday[currentDay];
*/

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date().toLocaleDateString("en-US", options);

//console.log(today.toLocaleDateString("en-US", options));


app.get("/", (req, res) => {
    //key: value
    //you can add more than one, this is a js object
    res.render('list', { day: today, listItem: listItem, listTitle:"Grocery" });
});

app.get("/work", (req, res) => {
    //key: value
    //you can add more than one, this is a js object
    res.render('list', { day: today, listItem: workListItem, listTitle:"Work" });
});


app.post("/", (req, res) => {
    if(req.body.list==="Work"){
        workListItem.push(req.body.todoEntry);
        res.redirect("/work");

    }else if (req.body.list==="Grocery"){
        listItem.push(req.body.todoEntry);
        res.redirect("/");

    }

});
app.listen(3000, () => {
    console.log("server started at  port 3000");
})