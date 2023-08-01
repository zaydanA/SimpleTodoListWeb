const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require('mongoose')



const todoList=[
];
let app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(`mongodb+srv://Cluster40452:fV1lSmh0fl5+@cluster40452.3dn76ns.mongodb.net/todoDB?retryWrites=true&w=majority`)

const itemsSchema={
    text:String,
}

const Item=mongoose.model("items",itemsSchema);

// const item1=new Item({
//     text:"Buy groceries"
// })

// const item2=new Item({
//     text:"Go to gym",
// })

// const item3=new Item({
//     text:"Buy Bebek Carok at Jl.Juanda"
// })

// Item.insertMany([item1,item2,item3]);

app.get("/",async (req,res)=>{
    try {
        var allItems = await Item.find({});
        res.render("home.ejs", {todoList:allItems,listSize:allItems.length,errorMessage:""})
    } catch (error) {
      res.status(404).send(error.message)
    }
})

app.post("/add",async (req,res)=>{
    try {
        if(req.body.postTodo){
            
            const newTodo= {text:req.body.postTodo};
            await Item.insertMany(newTodo);
            // todoList.push({text:newTodo})
            res.redirect("/")
        }else{
            var allItems = await Item.find({});
            res.render("home.ejs", {todoList:allItems,listSize:allItems.length,errorMessage:"Cannot be Empty..."})
            // res.redirect("/")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.get('/delete/:_id',async (req,res)=>{
    let idToDelete= req.params._id;
    await Item.deleteOne({_id:idToDelete});
    res.redirect("/");

})
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });