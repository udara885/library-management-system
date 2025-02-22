import mongoose from "mongoose"

const rentSchema = new mongoose.Schema({
	memberId: {
		type: String,
		require: true,
	},
	bookId: {
		type: String,
		require: true,
	},
	fromDate: {
		type: String,
		default: () => new Date().toISOString().split("T")[0],
	},
	toDate: {
		type: String,
		default: () => {
			const date = new Date()
			date.setDate(date.getDate() + 14)
			return date.toISOString().split("T")[0]
		},
	},
	status: {
		type: String,
		default: "Not returned",
	},
})

const Rent = mongoose.model("Rent", rentSchema)

export default Rent
