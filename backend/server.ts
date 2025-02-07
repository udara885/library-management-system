import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import bookRoutes from "./routes/book.routes"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use( express.json() )

app.use( "/api/test", ( req, res ) =>
{
	res.status(200).json({message: "API is working"})
})

app.use("/api", bookRoutes)

app.listen( PORT, () =>
{
  connectDB()
	console.log(`server is running on http://localhost:${PORT}`)
})
