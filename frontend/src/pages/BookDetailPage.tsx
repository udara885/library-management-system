import { useNavigate, useParams } from "react-router"
import { useBookStore } from "../store/book"
import { useContext, useEffect, useState } from "react"
import { BookUp, BookX } from "lucide-react"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"
import toast from "react-hot-toast"
import { Book } from "../types/types"
import Loader from "../components/Loader"
import GoBackBtn from "../components/GoBackBtn"

const BookDetailPage = () => {
	const { id } = useParams()

	const { getBook, deleteBook } = useBookStore()

	const [book, setBook] = useState<Book>()

	const [loading, setLoading] = useState(true)

	if (!id) {
		throw new Error("id is undefined")
	}

	useEffect(() => {
		const fetchBook = async () => {
			setLoading(true)
			const { data } = await getBook(id)
			setBook(data)
			setLoading(false)
		}
		fetchBook()
	}, [getBook, id])

	const adminContext = useContext(AdminContext)

	const navigate = useNavigate()

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	const { isAdmin } = adminContext

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
		<div>
			{loading ? (
				<Loader />
			) : (
				<div className="max-w-screen-xl mx-auto">
					<GoBackBtn />
					<div className="flex flex-col md:flex-row md:justify-between p-10 gap-5">
						<div className="flex justify-center md:w-1/3">
							<img
								src={book?.image}
								alt={book?.title}
							/>
						</div>
						<div className="flex flex-col gap-5 text-gray-200 md:w-2/3">
							<h1 className="text-3xl font-bold">
								{book?.title}
							</h1>
							<h2 className="text-lg italic text-gray-400">
								By {book?.author}
							</h2>
							<h3 className="text-lg">
								Category : {book?.category}
							</h3>
							<h4 className="text-lg">
								Published Year : {book?.publicationYear}
							</h4>
							<p className="text-lg text-justify">
								{book?.description}
							</p>
							{isAdmin && (
								<div className="flex justify-between w-full gap-10">
									<div className="w-1/2">
										<Link
											to={`/admin/update-book/${book?._id}`}
										>
											<button className="p-2 bg-blue-400 rounded-lg font-bold text-gray-900 flex items-center justify-center cursor-pointer w-full gap-1">
												<BookUp />
												Update
											</button>
										</Link>
									</div>
									<div className="w-1/2">
										<button
											className="p-2 bg-red-400 rounded-lg font-bold text-gray-900 flex items-center justify-center cursor-pointer w-full gap-1"
											onClick={() =>
												handleDelete(book?._id)
											}
										>
											<BookX /> Delete
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BookDetailPage
