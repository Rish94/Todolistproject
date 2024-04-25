const express = require('express');
const app = express();

const mongo = require('mongoose');


mongo.connect("mongodb://localhost:27017/ToDoList", {useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 30000}).then(()=>{
    console.log("DataBase Connected");
})



const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static('static'))

app.use(bodyParser.json());


const schema = mongo.Schema({
    title:String,
    description:String,
    date:String
})

const model = mongo.model('Collection',schema);


app.get('/',(req,res)=>{
    // const ram = {
    //     "title":"Birds",
    //     "description":"Birds are beautiful in nature"
    // }
    // const document= new model(ram);
    // document.save();

})


app.post('/createtask',async (req,res)=>{
    const {title,desc} = req.body;
//     console.log(`Title: ${title}`);
//   console.log(`Description: ${desc}`);

// console.log(`Description: ${currentDate}`);

const currentDate = new Date();

    const task = new model();
    task.title = title;
    task.description = desc;
    task.date=currentDate;

    const saved =  await task.save();

   if(!saved){
    console.log("data not saved");
   }else{
    console.log("Data saved Successfully");
   }

    res.send("task created sucessfully");
})



app.get('/todolists',async (req,res)=>{
    const data = await model.find({});
    // console.log(data);
    res.send(data);
})

app.delete('/deletetask/:id',async(req,res)=>{
    const taskid = req.params.id;
    const taskdel = await model.findByIdAndDelete(taskid);
})




app.listen(3200,()=>{
    console.log("server listen");
})



