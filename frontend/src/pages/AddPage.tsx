import { MouseEvent, useState } from "react"
import { useBookStore } from "../store/book"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { Book } from "../types/types"

const AddPage = () => {
	const [newBook, setNewBook] = useState<Book>({
		title: "",
		author: "",
		category: "",
		image: "",
		publicationYear: "",
		description: "",
		quantity: 1,
	})

	const navigate = useNavigate()

	const { addBook } = useBookStore()

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const { success, message } = await addBook(newBook)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			navigate(-1)
			setNewBook({
				title: "",
				author: "",
				category: "",
				image: "",
				publicationYear: "",
				description: "",
				quantity: 1,
			})
		}
	}

	const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		navigate(-1)
	}

	return (
		<div className="max-w-screen-sm flex flex-col mx-auto gap-5 p-5">
			<h1 className="font-bold text-gray-200 text-xl md:text-2xl text-center">
				Add New Book
			</h1>
			<form className="flex flex-col w-full gap-5">
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Book Title"
					type="text"
					name="title"
					value={newBook.title}
					onChange={(e) => {
						setNewBook({
							...newBook,
							title: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Author"
					type="text"
					name="author"
					value={newBook.author}
					onChange={(e) => {
						setNewBook({
							...newBook,
							author: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Category"
					type="text"
					name="category"
					value={newBook.category}
					onChange={(e) => {
						setNewBook({
							...newBook,
							category: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Image URL"
					type="text"
					name="image"
					value={newBook.image}
					onChange={(e) => {
						setNewBook({
							...newBook,
							image: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Publication Year"
					type="text"
					name="publicationYear"
					value={newBook.publicationYear}
					onChange={(e) => {
						setNewBook({
							...newBook,
							publicationYear: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Quantity"
					type="number"
					name="quantity"
					value={newBook.quantity}
					onChange={(e) => {
						setNewBook({
							...newBook,
							quantity: Number(e.target.value),
						})
					}}
				/>
				<textarea
					className="border border-gray-500 rounded text-white p-2 resize-none focus:border-blue-500 outline-none"
					placeholder="Description"
					rows={4}
					name="description"
					value={newBook.description}
					onChange={(e) => {
						setNewBook({
							...newBook,
							description: e.target.value,
						})
					}}
				/>
				<button
					className="bg-blue-400 font-bold rounded p-2 md:text-lg cursor-pointer"
					onClick={handleSubmit}
				>
					Submit
				</button>
				<button
					className="border border-blue-400 text-blue-400 font-bold rounded p-2 md:text-lg cursor-pointer"
					onClick={handleClose}
				>
					Cancel
				</button>
			</form>
		</div>
	)
}

export default AddPage
