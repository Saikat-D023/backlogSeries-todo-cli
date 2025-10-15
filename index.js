import express from "express";
import bodyparser from "body-parser";
import TodoDB from "./db.js";

import mongoose from "mongoose";
mongoose.connect("mongoURL")

const app = express();

app.use(bodyparser.json());

let todo = [];
let idCounter = 0;

app.get("/todos", async (req,res) => {
    return res.json({
        message: "Welcome to the Todo API",
        count: await TodoDB.countDocuments(),
        todos: await TodoDB.find()
    })
})

app.post("/todos/add", async(req,res) => {
    const todoText = req.body.todo

    await TodoDB.create({
        todo: todoText,
        completed: false
    })

    return res.json({
        message: "Todo added successfully",
        todos: await TodoDB.find()
    })

})

app.delete("/todos/delete", async (req,res) => {
    const todoText = req.body.todo
    await TodoDB.deleteOne({ todo: todoText })

    return res.json({
        message: "Todo deleted successfully"
    })
})

app.post("/todos/done", async (req, res) => {
    const todoText = req.body.todo
    const found = await TodoDB.findOne({ todo: todoText })

    if(found){
        found.completed = true
        await TodoDB.updateOne({ todo: todoText }, { completed: true })
        return res.json({
            message: "Todo marked as done",
            todos: await TodoDB.find()
        })
    }else{
        return res.status(404).json({
            message: "Todo not found"
        })
    }
})

app.listen(3000, () => {
    console.log("port running on 3000")
})
