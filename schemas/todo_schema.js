import mongoose  from "mongoose";

const { Schema, model } = mongoose;

const todoSchema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date_time:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: false,
        default: false
    }
})

const todoModel = model('todos',
todoSchema)

//to enable exporting the module to a file
export default todoModel;