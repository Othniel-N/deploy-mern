import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/MongoDB.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import { errorHandler, notFound } from './Middleware/Error.js';


dotenv.config();
connectDatabase();
const app = express();


// Set the expected host header
app.use((req, res, next) => {
  req.headers.host = 'https://netlify-kohl.vercel.app'; // Replace with your ngrok domain
  next();
});

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use(notFound);
app.use(errorHandler);

//below get call is to test whether is running or not

app.get('/api', (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, console.log(`server is running on ${PORT}`))
