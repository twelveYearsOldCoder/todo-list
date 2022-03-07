const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
//επειδη εχει οριστει date, καθε φορα θα πρεπει να χρισιμοποιησω την date() Και οχι το ονομα που εχει οριστει στο Module
const date = require(__dirname+"/date.js");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//connect to the database
mongoose.connect("mongodb://localhost:27017/todolistDB");

//create schema
const listSchema ={
    name: String
};
//create the model
const Item = mongoose.model("Item", listSchema);

const item1 = new Item({
    name: "First"
});
const item2 = new Item({
    name: "Second"
});const item3 = new Item({
    name: "Third"
});

const defaultItems = [item1, item2, item3];
var workListItem = [];

let today= date.getDate();

app.get("/", (req, res) => {
    Item.find({},(err, results)=>{
        //only populate the default array the first time
        if(results.length===0){
            Item.insertMany(defaultItems, (err)=>{
                if (err){
                    console.log(err);
                }else {
                    console.log("the default array was inserted successfully");
                }
            });
            res.redirect("/");
        }else{
            res.render('list', { day: "Today", listItem: results, listTitle:"Grocery" });

        }

    })

    //key: value
    //you can add more than one, this is a js object
    //changed  day: today -> day: "today" in order to remove some complexity
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