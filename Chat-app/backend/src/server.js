import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
dotenv.config({
    path: './env'
})
const app = express();
const port = process.env.PORT|| 8000;

// importing  routes
app.use('/api/auth',authRoutes )
app.use('/api/message', messageRoutes)



app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`)
})