

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
//Local module thats why we are using .js in the end...
// const date = require(__dirname + "/date.js");

const app = express();

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

// ====== App using modules============
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// ===============connecting Mongoose============⭐
mongoose.connect("mongodb://localhost:27017/todolistDB");


// ================Mongoose Schema (DATA)======================⭐
const itemsSchema = {
  name: String, //Data type in Uppercase.
};


// ===========Mmongoose Model===================

const Item = mongoose.model( "Item", itemsSchema);

// =============Mongoose Document===========
const item1 = new Item({
  name:"Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to aff a new item."
});

const item3 = new Item({
  name:"<------Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];

//Mongoose Custom list Schema for multiple routes.
const listSchema = {
  name: String,
  items: [itemsSchema]
};
 //Mongoose model for multiple routes.
 const List = mongoose.model("List", listSchema);



// =====================Home/root route==================
app.get("/", function(req, res) {

  //mongoose find items from the console log.
  Item.find({},function(err, foundItems){

    // Checking if the array is empty.
    if (foundItems.length === 0) {
      // Inserting to the model name
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } 
        else {
          console.log("Successfully saved the default items to DB.")
        }
      });
      res.redirect("/"); //redirecting to the home route after adding the data in the empty array.
    } else {
      // Rendering the EJS.
    res.render("list", {
      listTitle: "Today",
      newListItems: foundItems
    });
    }
  });

});

//==================== Express Route Parameters (for multiple routes)================================
app.get("/:customListName", function(req, res){
  
  const customListName = _.capitalize(req.params.customListName);
  //Finding as the route is already exist.
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        //Create a new list.
        const list = new List ({
          name: customListName,
          items: defaultItems
        });
      
        list.save();
        //After making a new route redirecting the route to that route.
        res.redirect("/" + customListName);
      } else {
        //Show an existing list.
        res.render("List", {listTitle: foundList.name, newListItems: foundList.items});
        
      }
      
    }
  });

  

});


    // ==================post request response==================
app.post("/", function(req,res){

 //stores users input in variable item.
    const itemName = req.body.newItem;
    const listName = req.body.list;

    //mongoose document.
    const item = new Item({
      name: itemName
    });

    //Checking if the route is home or other and adding items according to it...
    if(listName === "Today"){
      item.save();
      res.redirect("/");
    }  else {
        List.findOne({name: listName}, function(err, foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      });
    }
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function(err){
      if(!err){
        console.log("Successfully deleted the item");
        res.redirect("/");
      }
        
    });

  } else {
    List.findOneAndUpdate({name: listName}, {$pull:{items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/"+ listName);
      }
    });

  }

  
});

  

  // ===============about page render===============
app.get("/about", function(req, res) {
  res.render("about");
});




// ========================listen app at port: 3000 =========================
    app.listen(3000, function() {
      console.log("server started on port: 3000");
    });
