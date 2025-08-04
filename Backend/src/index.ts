import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from './config/dbConfig';


dotenv.config()

const app = express()

const PORT = process.env.PORT as string

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.send('application is running successfully')
})

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
};

startServer();