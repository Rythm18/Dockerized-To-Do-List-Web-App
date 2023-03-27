const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("pubkic"));
app.set('view engine','ejs');

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemsSchema = {
    name: String,

};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome"
});

const item2 = new Item({
    name: "Hit the + button to delete an item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1,item2,item3];



app.get("/",function(req,res){




    Item.find({}).then(function(foundItems){

        if (foundItems.length === 0){
            Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });
        } else{
            res.render("list", { listTitle: "Today", newItems: foundItems });
        }

       
      })
      .catch(function(err){
        console.log(err);
      });
    });
    


app.post("/",function(req,res){
    let item=req.body.new;
    if(req.body.list === "Work"){
        workI.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req,res){
    res.render("list",{listTitle: "Work List", newItems: workI});
});

app.post("/work", function(req,res){
    let item=req.body.new;
    workI.push(item);
    res.redirect("/work");
})

app.listen(3000,function(){
    console.log("Server running on port 3000.");
});