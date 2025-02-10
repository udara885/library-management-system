import { useNavigate, useParams } from "react-router"
import { useBookStore } from "../store/book"
import { useContext, useEffect, useState } from "react"
import { Book } from "../types/types"
import { Edit, Trash } from "lucide-react"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"
import toast from "react-hot-toast"

const BookDetailPage = () => {
	const [book, setBook] = useState<Book | undefined>()
	const { id } = useParams()
	const { getBook, deleteBook } = useBookStore()
	const adminContext = useContext(AdminContext)
	const navigate = useNavigate()

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	const { isAdmin } = adminContext

	useEffect(() => {
		if (id) {
			setBook(getBook(id))
		}
	}, [getBook, id])

	const handleDelete = async (id: string | undefined): Promise<void> => {
		if (!id) {
			throw new Error("id is undefined")
		}
		const { success, message } = await deleteBook(id)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
		}
		navigate("/admin")
	}

	return (
		<div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:justify-between p-10">
			<div className="flex justify-center">
				<img
					src={book?.image}
					alt={book?.title}
				/>
			</div>
			<div className="flex flex-col gap-5 text-gray-200 pt-5">
				<h1 className="text-3xl font-bold">{book?.title}</h1>
				<h2 className="text-lg italic text-gray-400">
					By {book?.author}
				</h2>
				<h3 className="text-lg">Category : {book?.category}</h3>
				<h4 className="text-lg">
					Published Year : {book?.publicationYear}
				</h4>
				<p className="text-lg text-justify">{book?.description}</p>
				{isAdmin && (
					<div className="flex justify-between">
						<Link to={`/admin/update-book/${book?._id}`}>
							<button className="p-2 w-32 bg-blue-400  rounded-lg font-bold text-gray-900 flex items-center justify-center">
								<Edit />
								Update
							</button>
						</Link>
						<button
							className="p-2 w-32 bg-red-400 rounded-lg font-bold text-gray-900 flex items-center justify-center"
							onClick={() => handleDelete(book?._id)}
						>
							<Trash /> Delete
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default BookDetailPage
