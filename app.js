const express = require("express");
const bodyParser = require("body-parser");
const ejsLint = require('ejs-lint');
const mymodule = require(__dirname + "/mymodule.js");
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

// Creating mongoose database and add default items

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const itemsSchema = {
  task: {
    type: String,
    required: true
  }
};
const Item = mongoose.model('Item', itemsSchema);


const Item1 = new Item({
  task: "Exercise"
});
const Item2 = new Item({
  task: "Meditaion"
});
const Item3 = new Item({
  task: "Surya Aasan"
});

const defaultItems = [Item1, Item2, Item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema)

// Creating mongoose database and add default items CLOSED

app.set("view engine", "ejs");

app.get("/", function(req, res) {

  let day = mymodule.date();
  Item.find({}, function(err, foundItem) {
    if (foundItem.length === 0) {
      Item.insertMany(defaultItems, function(err, foundItem) {
        if (err) {
          console.log("Error = " + err);

        } else {
          console.log('Default items successfully insert, foundItem length = ' + foundItem.length);
          res.redirect("/");

        }
      });
    } else {
      res.render("list", {
        listTitle: day,
        items: foundItem
      })
      console.log('foundItem length = ' + foundItem.length);
    }
  })


}); //app.get("/") closed


app.get("/:customListName", function(req, res) {
  const customListName = req.params.customListName;
  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) { // not found the customListName in foundList then execute if code
        //Creating a new list or add our default list
        console.log("doesn't exists");
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        // res.redirect("/" + customListName);
      } else {
        // show existing list
        res.render("list", {
          listTitle: foundList.name,
          items: foundList.items
        });
        console.log("exists");
      }
      console.log("Error = " + err);

    }

  });
}); //app.get("/:customListName") closed

app.post("/", function(req, res) {

  function specificpush() { // for push item in specific array
    if (req.body.list === "Work List") {
      workItem.push(justItem);
      res.redirect("/work");
    } else {
      list_item.push(justItem);
      res.redirect("/");
    }
    console.log(req.body);
  }

  let itemName = req.body.newItem;
  itemName = itemName.trim()
  itemName = mymodule.capitalfirstlatter(itemName)
  item = new Item({
    task: itemName
  });
  item.save();
  res.redirect("/");
}); //app.post("/") closed

app.post("/delete", function(req, res) {
  const Checkbox = req.body.newCheckbox;
  console.log("id = " + Checkbox + " successfully deleted.");
  Item.findByIdAndRemove(Checkbox, function(err) {
    if (err) {
      console.log("Error = " + err);
    } else {
      res.redirect("/");
    }
  });
}); //app.post("/delete") CLOSED

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("server is running on port 3000 !")
});
