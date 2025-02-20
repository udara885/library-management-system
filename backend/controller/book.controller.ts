import Book from "../model/book.model"
import mongoose from "mongoose"

export const getBooks = async (req: any, res: any) => {
	try {
		const books = await Book.find({})
		res.status(200).json({ success: true, data: books })
	} catch (error: any) {
		console.error(`Error in getBooks: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const getBook = async (req: any, res: any) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		const book = await Book.findById(id)
		res.status(200).json({ success: true, data: book })
	} catch (error: any) {
		console.error(`Error in getBook: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const addBook = async (req: any, res: any) => {
	const book = req.body

	if (
		!book.title ||
		!book.author ||
		!book.category ||
		!book.image ||
		!book.publicationYear||
		!book.quantity
	) {
		return res
			.status(400)
			.json({ success: false, message: "Please fill all the fields" })
	}

	const newBook = new Book(book)

	try {
		await newBook.save()
		res.status(201).json({ success: true, data: newBook })
	} catch (error: any) {
		console.error(`Error in addBook: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const updateBook = async (req: any, res: any) => {
	const { id } = req.params
	const book = req.body

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}

	try {
		const updatedBook = await Book.findByIdAndUpdate(id, book, {
			new: true,
		})
		res.status(200).json({ success: true, data: updatedBook })
	} catch (error: any) {
		console.error(`Error in updatebook: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const deleteBook = async (req: any, res: any) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}

	try {
		await Book.findByIdAndDelete(id)
		res.status(200).json({ success: true, message: "Book deleted" })
	} catch (error: any) {
		console.error(`Error in deleteBook: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}
