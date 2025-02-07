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
	publicationYear: {
		type: Number,
		require: true,
	},
	description: {
		type: String,
	}
}, {
  timestamps: true
})

const Book = mongoose.model( "Book", bookSchema )

export default Book