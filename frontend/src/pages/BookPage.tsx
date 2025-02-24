import { useContext, useEffect, useState } from "react"
import { useBookStore } from "../store/book"
import { Book } from "../types/types"
import { CirclePlus, Search } from "lucide-react"
import { Link } from "react-router"
import BookCard from "../components/BookCard"
import Loader from "../components/Loader"
import { AdminContext } from '../context/adminContext'

const BookPage = () => {
	const { getBooks, books } = useBookStore()

	const [filteredBooks, setFilteredBooks] = useState<Book[]>()

	const [loading, setLoading] = useState(true)

	const adminContext = useContext(AdminContext)

	if ( !adminContext )
	{
	  throw new Error("adminContext is undefined")
	}

	const {isAdmin} = adminContext

	const handleInputChange = (e: { target: { value: string } }) => {
		const searchTerm = e.target.value
		const filteredBooks = books.filter((book) =>
			book.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredBooks(filteredBooks)
	}

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true)
			await getBooks()
			setLoading(false)
		}
		fetchBooks()
	}, [getBooks])

	useEffect(() => {
		setFilteredBooks(books)
	}, [books])

	return (
		<div className="py-5 max-w-screen-xl mx-auto">
			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center gap-2 w-full">
						<div className="relative w-[60%] sm:w-[50%]">
							<input
								type="text"
								className="border border-gray-500 rounded-full w-full text-gray-200 p-2 focus:border-blue-500 outline-none sm:text-center md:text-lg"
								placeholder="Search Books"
								onChange={handleInputChange}
							/>
							<div className="absolute right-0 inset-y-0 pr-3 flex items-center justify-center text-gray-500 pointer-events-none">
								<Search />
							</div>
						</div>

						{isAdmin && <Link to={"/admin/add-book"}>
							<button className="bg-blue-400 px-5 py-2 rounded-full font-bold flex md:text-lg gap-1 items-center">
								<CirclePlus />
								Add
							</button>
						</Link>}
					</div>
					<div className="flex flex-wrap items-center justify-around gap-10 px-10 py-10">
						{filteredBooks?.length !== 0 ? (
							filteredBooks?.map((book) => (
								<BookCard
									key={book._id}
									book={book}
								/>
							))
						) : (
							<p className="text-gray-300 font-semibold text-lg">
								No Books found
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default BookPage
