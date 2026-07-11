import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import productRouter from './routes/product.route.js'

dotenv.config();

const port = process.env.PORT ||8000;
const app = express();
// for parsing json data into req.body we have to use middleware
app.use(express.json());

app.get('/', (req, res) => {
    console.log('helo tarun ')
    res.send(`Welcome to Home page `)
})

// importing routes
app.use('/api/products', productRouter)

app.listen(port, () => {
    connectDb();
    console.log(`server is running on http://localhost:${port}`);
})