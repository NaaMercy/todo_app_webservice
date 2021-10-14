import dotenv from 'dotenv'
import express from 'express';
import Mongoose  from 'mongoose';
import TodoModel from './schemas/todo_schema.js';

dotenv.config()

const app = express();
//getting values in json format
app.use(express.json());
const port = 3000 || process.env.PORT;
const db = process.env.DB_URL;


Mongoose.connect('mongodb+srv://db_admin:admin1234@cluster0.xzybz.mongodb.net/todo_db?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Connected to MongoDB');
}).catch((err) =>{
    console.log(err);
})
//get all todos
//get one todo
//create todo
//delete todo
//patch one todo

app.get('/', (req, res) =>{
    return res.status(200).json({
        message: "Welcome to the todo API."
    })
})

///get all todos
app.get('/todos', async (req, res) =>{
    const todoModel = await TodoModel.find({});
    if (todoModel){
        return res.status(200).json({
            status : true,
            message: "Todos fetched successfully",
            data: todoModel
            
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "Todos not found",
        })
    }
    })


///get one todo
app.get('/todos/:id',async (req, res) =>{
    const {id} = req.params;
    const todoModel = await TodoModel.findById(id);
    if (todoModel){
        return res.status(200).json({
            status : true,
            message: "Todos fetched successfully",
            data: todoModel
            
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "Todos not found",
        })
    }
})

///post one todo
app.post('/todos/', async (req, res) =>{
    const {title,description,date_time,status} = req.body;
    const todoModel = await TodoModel.create({
        title,
        description,
        date_time
    })
    if (todoModel){
        return res.status(201).json({
            status : true,
            message: "Todos fetched successfully",
            data: todoModel
            
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "Todos not created",
        })
    }
})

///update a todo
app.patch('/todos/:id', async (req, res) =>{
    const {id} =req.params;
    const{status}=req.body;

    const todoModel= await TodoModel.updateOne(
        {status:status}).where({_id : id})
    
    if (todoModel){
        return res.status(201).json({
            status : true,
            message: "Todos updated successfully",
            data: todoModel    
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "Todos failed to update",
        })
    }
})

app.delete('/todos/:id', async (req, res) =>{
    const todoModel = await TodoModel.findByIdAndDelete(req.params.id);
    if (todoModel){
        return res.status(201).json({
            status : true,
            message: "Todos deleted successfully",
            data: todoModel
            
        })
    }else{
        return res.status(400).json({
            status: false,
            message: "Failed to delete",
        })
}

    })
    
//listening to port
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));