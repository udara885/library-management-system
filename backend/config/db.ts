import mongoose from "mongoose"

export const connectDB = async () => {
	try {
		if (!process.env.MONGO_URI) {
			throw new Error("MONGO_URI not available")
		}
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error: any) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}
