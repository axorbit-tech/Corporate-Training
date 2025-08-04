import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT as string

app.get('/', (req, res)=> {
    res.send('application is running successfully')
})

app.listen(PORT, ()=> {
    console.log(`app is running on http://localhost:${PORT}`)
})