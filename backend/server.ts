import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/", (req, res) => {
	res.status(200)
	res.send("API working")
})

app.listen( PORT, () =>
{
  connectDB()
	console.log(`server is running on http://localhost:${PORT}`)
})
