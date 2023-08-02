const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require('mongoose')



let app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(`mongodb+srv://Cluster40452:fV1lSmh0fl5+@cluster40452.3dn76ns.mongodb.net/todoDB?retryWrites=true&w=majority`)

const itemsSchema={
    text:String,
}

const Item=mongoose.model("items",itemsSchema);



app.get("/",async (req,res)=>{
    try {
        var allItems = await Item.find({});
        res.render("index", {todoList:allItems,listSize:allItems.length,errorMessage:""})
    } catch (error) {
      res.status(404).send(error.message)
    }
})

app.post("/",async (req,res)=>{
    try {
        if(req.body.postTodo){
            
            const newTodo= {text:req.body.postTodo};
            await Item.insertMany(newTodo);
            res.redirect("/")
        }else{
            var allItems = await Item.find({});
            res.render("index", {todoList:allItems,listSize:allItems.length,errorMessage:"Cannot be Empty..."})
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