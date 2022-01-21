const express = require("express");
const bodyParser = require("body-parser");
//Local module thats why we are using .js in the end...
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// =====================home/root route .==================
app.get("/", function(req, res) {

  let day = date.getDate();


//===================rendering the EJS================
      res.render("list", {
        listTitle: day,

        newListItems: items
      });

    });

    // ==================post request response==================
  app.post("/", function(request,respond){

//stores users input in variable item.
    let item = request.body.newItem;

    if(request.body.list === "Work"){
      workItems.push(item);

      respond.redirect("/work");

    } else {
      items.push(item); // and push it in larger array everytime user input any item.

      respond.redirect("/") //after pushing it redirect to the app.get or home/root route.

    }
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
