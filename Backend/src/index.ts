import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from './config/dbConfig';
import cors from 'cors'
// import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
// import trainerRoutes from './routes/trainerRoutes'

dotenv.config()

const app = express()

const PORT = process.env.PORT as string

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.get('/', (req, res)=> {
    res.send('application is running successfully')
})

// app.use('/api', userRoutes)
app.use('/api/admin', adminRoutes)
// app.use('/api/trainer', trainerRoutes)


const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
};

startServer();