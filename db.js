import mongoose from "mongoose";

const schema = mongoose.Schema({
    todo: String,
    completed: Boolean
});

const TodoDB = mongoose.model("Todo", schema);

export default TodoDB;
