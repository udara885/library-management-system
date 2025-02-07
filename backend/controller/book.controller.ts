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

