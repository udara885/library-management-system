import { MouseEvent, useEffect, useState } from "react"
import { useBookStore } from "../store/book"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import { Book } from "../types/types"
import Loader from "../components/Loader"

const UpdatePage = () => {
	const { id } = useParams()

	if (!id) {
		throw new Error("id is undefined")
	}

	const { updateBook, getBook } = useBookStore()

	const [updatedBook, setUpdatedBook] = useState<Book>({
		title: "",
		author: "",
		category: "",
		image: "",
		publicationYear: "",
		description: "",
		quantity: 1,
	})

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBook = async () => {
			setLoading(true)
			const res = await getBook(id)
			if ('data' in res) {
				setUpdatedBook(res.data)
			} else {
				toast.error(res.message)
			}
			setLoading(false)
		}
		fetchBook()
	}, [getBook, id])

	const navigate = useNavigate()

	const handleSubmit = async (
		e: MouseEvent<HTMLButtonElement>,
		id: string,
		updatedBook: Book
	) => {
		e.preventDefault()
		const { success, message } = await updateBook(id, updatedBook)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			navigate(-1)
		}
	}

	const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		navigate(-1)
	}

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div className="max-w-screen-sm flex flex-col mx-auto gap-5 p-5">
					<h1 className="font-bold text-gray-200 text-xl md:text-2xl text-center">
						Update Book
					</h1>
					<form className="flex flex-col w-full gap-5">
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Book Title"
							type="text"
							name="title"
							value={updatedBook?.title}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									title: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Author"
							type="text"
							name="author"
							value={updatedBook?.author}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									author: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Category"
							type="text"
							name="category"
							value={updatedBook?.category}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									category: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Image URL"
							type="text"
							name="image"
							value={updatedBook?.image}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									image: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Publication Year"
							type="text"
							name="publicationYear"
							value={updatedBook?.publicationYear}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									publicationYear: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Quantity"
							type="number"
							name="quantity"
							value={updatedBook.quantity}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									quantity: Number(e.target.value),
								})
							}}
						/>
						<textarea
							className="border border-gray-500 rounded text-white p-2 resize-none focus:border-blue-500 outline-none"
							placeholder="Description"
							rows={4}
							name="description"
							value={updatedBook?.description}
							onChange={(e) => {
								setUpdatedBook({
									...updatedBook,
									description: e.target.value,
								})
							}}
						/>
						<button
							className="bg-blue-400 font-bold rounded p-2 md:text-lg cursor-pointer"
							onClick={(e) => handleSubmit(e, id, updatedBook)}
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
			)}
		</div>
	)
}

export default UpdatePage
