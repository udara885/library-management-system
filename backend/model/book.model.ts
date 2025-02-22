import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	author: {
		type: String,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	image: {
		type: String,
		require: true
	},
	publicationYear: {
		type: String,
		require: true,
	},
	description: {
		type: String,
	},
	quantity: {
		type: Number,
		default: 1,
		require:true
	}
}, {
  timestamps: true
})

const Book = mongoose.model( "Book", bookSchema )

export default Book