import { useEffect, useState } from "react"
import BookCard from "../components/BookCard"
import { useBookStore } from "../store/book"
import Loader from "../components/Loader"
import { Search } from "lucide-react"
import { Book } from "../types/types"

const HomePage = () => {
	const { getBooks, books } = useBookStore()
	const [loading, setLoading] = useState(true)
	const [filteredBooks, setFilteredbooks] = useState<Book[]>()
	const [searchItem, setSearchItem] = useState("")

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true)
			await getBooks()
			setLoading(false)
		}
		fetchBooks()
	}, [getBooks])

	useEffect(() => {
		setFilteredbooks(books)
	}, [books])

	const handleInputChange = (e: { target: { value: string } }) => {
		const searchTerm = e.target.value
		setSearchItem(searchTerm)
		const filteredBooks = books.filter((book) =>
			book.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredbooks(filteredBooks)
	}

	return (
		<div className="py-5 max-w-screen-xl mx-auto">
			{loading ? (
				<Loader />
			) : (
				<div>
					<div className="relative flex items-center justify-center w-[50%] mx-auto">
						<input
							type="text"
							className="border border-gray-500 rounded-full w-full text-gray-200 p-2 focus:border-blue-500 outline-none"
							placeholder="Search Books"
							value={searchItem}
							onChange={handleInputChange}
						/>
						<div className="absolute right-0 inset-y-0 pr-3 flex items-center justify-center text-gray-500 pointer-events-none">
							<Search />
						</div>
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

export default HomePage
