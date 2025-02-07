import express from "express"
import {
	addBook,
	deleteBook,
	getBooks,
	updateBook,
} from "../controller/book.controller"

const router = express.Router()

router.get("/books", getBooks)
router.post("/add-book", addBook)
router.put("/update-book/:id", updateBook)
router.delete("/delete-book/:id", deleteBook)

export default router