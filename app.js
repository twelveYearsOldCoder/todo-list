const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
//επειδη εχει οριστει date, καθε φορα θα πρεπει να χρισιμοποιησω την date() Και οχι το ονομα που εχει οριστει στο Module
const date = require(__dirname + "/date.js");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//connect to the database
mongoose.connect("mongodb://localhost:27017/todolistDB");

//create schema
const itemSchema = {
    name: String
};
//create the model
const Item = mongoose.model("Item", itemSchema);

const listSchema = {
    name: String,
    items: [itemSchema]
};
const List = mongoose.model("List", listSchema);

const item1 = new Item({
    name: "First"
});
const item2 = new Item({
    name: "Second"
}); const item3 = new Item({
    name: "Third"
});

const defaultItems = [item1, item2, item3];

let today = date.getDate();

app.get("/", (req, res) => {
    Item.find({}, (err, results) => {
        //only populate the default array the first time
        if (results.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("the default array was inserted successfully");
                }
            });
            res.redirect("/");
        } else {
            res.render('list', { day: "Today", listItem: results, listTitle: "Home" });

        }

    })


});

//dynamicly create pages
app.get("/:catName", (req, res) => {
    const reqUrl = req.params.catName;
    List.findOne({ name: reqUrl }, (err, result) => {
        console.log(reqUrl);
        if (!err) {
            console.log("not error");
            if (!result) {
                console.log("no result");
                const list = new List({
                    name: reqUrl,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+reqUrl);
            } else {
                console.log("entered else");
                //   res.render("list", { day: "Today", listItem: result, listTitle:"Grocery" })
                res.render("list", { day: "Today", listItem: result.items, listTitle: result.name })
            }
        }
    })

});




app.post("/", (req, res) => {
    const itemName = req.body.todoEntry;
    const newItem = new Item({
        name: itemName
    })
    newItem.save();
    res.redirect("/");
});


app.post("/delete", (req, res) => {
    const itemID = req.body.checkbox;
    Item.deleteOne({ itemID }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("successfully deleted the item with id " + itemID);
        }
    })
    res.redirect("/");
});



app.listen(3000, () => {
    console.log("server started at  port 3000");
});