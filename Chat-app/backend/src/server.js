import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import path from 'path'

dotenv.config()
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
const __dirname = path.resolve()

// importing  routes
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

// making ready for project for deployment 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    // console.log(__dirname);
    // console.log(path.join(__dirname, "../frontend/dist"));
    // console.log(process.env.NODE_ENV);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    })
}


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})