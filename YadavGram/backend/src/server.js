import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';

// configuring the dotenv file 
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res)=> {
    res.send('Welcome to Home Page');
})

app.listen(port , ()=> {
    connectDb();
    console.log(`server is running on http://localhost:${port}`)
})