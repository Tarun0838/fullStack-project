import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import { userRouter } from './routes/user.routes.js';


dotenv.config({
    path: './.env'
})

// testing the server


const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.get('/', (req , res)=> {
    res.send("Welcome to Home Page ")
})

// import routes
app.use('/api/v1/user', userRouter)

connectDb()
.then(()=> {
    app.listen(port, ()=> {
        console.log('server is running on http://localhost:', port)
    })
})