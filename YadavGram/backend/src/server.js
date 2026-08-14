import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.routes.js';
import reelRouter from './routes/reel.route.js';
import storyRouter from './routes/story.route.js';

// configuring the dotenv file 
dotenv.config({
   path: "./.env"
});



const app = express();
const port = process.env.PORT || 8000;

// configuring middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// importing auth routes

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/reel', reelRouter)
app.use('/api/story', storyRouter)


app.get('/', (req, res)=> {
    res.send('Welcome to Home Page');
})


app.listen(port , ()=> {
    connectDb();
    console.log(`server is running on http://localhost:${port}`)
})
