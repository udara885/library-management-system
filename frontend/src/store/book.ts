import { create } from "zustand"
import { Book } from "../types/types"

type BookState = {
	books: Book[]
	setBooks: (books: Book[]) => void
	addBook: (newBook: Book) => Promise<{
		success: boolean
		message: string
	}>
	getBooks: () => void
	getBook: (id: string) => Promise<
		 {
				success: boolean
				data: Book
		  }
		| {
				success: boolean
				message: string
		  }
	>
	updateBook: (
		id: string,
		updatedBook: Book
	) => Promise<{
		success: boolean
		message: string
	}>
	deleteBook: (id: string) => Promise<{
		success: boolean
		message: string
	}>
}

export const useBookStore = create<BookState>((set) => ({
	books: [],
	setBooks: (books) => set({ books }),
	getBooks: async () => {
		const res = await fetch("/api/books")
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set({ books: data.data })
	},
	getBook: async (id) => {
		const res = await fetch(`/api/book/${id}`)
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		return { success: true, data: data.data }
	},
	addBook: async (newBook) => {
		const res = await fetch("/api/add-book", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBook),
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({ books: [...state.books, data.data] }))
		return { success: true, message: "Book added successfully" }
	},
	updateBook: async (id, updatedBook) => {
		const res = await fetch(`/api/update-book/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedBook),
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			books: state.books.map((book) =>
				book._id === id ? data.data : book
			),
		}))
		return { success: true, message: "Book Updated" }
	},
	deleteBook: async (id) => {
		const res = await fetch(`/api/delete-book/${id}`, {
			method: "DELETE",
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			books: state.books.filter((book) => book._id === id),
		}))
		return { success: true, message: data.message }
	},
}))
