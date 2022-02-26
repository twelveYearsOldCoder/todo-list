const express = require("express");
const app = express();
const ejs = require("ejs");
const { urlencoded } = require("express");
//επειδη εχει οριστει date, καθε φορα θα πρεπει να χρισιμοποιησω την date() Και οχι το ονομα που εχει οριστει στο Module
const date = require(__dirname+"/date.js");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
var listItem = [];
var workListItem = [];

let today= date.getDate();

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