

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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


// ================Mongoose Schema======================⭐
const listSchema = {
  name: String, //Data type in Uppercase.
};

// ===========Mmongoose Model===================

const Item = mongoose.model( "Item", listSchema);

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

    // ==================post request response==================
  app.post("/", function(request,respond){

//stores users input in variable item.
    let itemName = request.body.newItem;

    //mongoose document.
    const item = new Item({
      name: itemName
    });

    item.save();

    respond.redirect("/");

  //   if(request.body.list === "Work"){
  //     workItems.push(item);

  //     respond.redirect("/work");

  //   } else {
  //     foundItems.push(item); // and push it in larger array everytime user input any item.⭐

  //     respond.redirect("/") //after pushing it redirect to the app.get or home/root route.

  //   }
  });

  //==================== targeting work route================================
  app.get("/work", function(req, res){
    res.render("list", {
      listTitle: "Work List",
      newListItems:workItems
    });

  });

  // ===============about page render===============
  app.get("/about", function(req, res) {
    res.render("about");
  });




// ========================listen app at port: 3000 =========================
    app.listen(3000, function() {
      console.log("server started on port: 3000");
    });
