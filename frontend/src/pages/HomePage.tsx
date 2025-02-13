import { useEffect, useState } from "react"
import BookCard from "../components/BookCard"
import { useBookStore } from "../store/book"
import Loader from "../components/Loader"

const HomePage = () => {
	const { getBooks, books } = useBookStore()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true)
			await getBooks()
			setLoading(false)
		}
		fetchBooks()
	}, [getBooks])

	return (
		<div className="py-10 max-w-screen-xl mx-auto">
			{loading ? (
					<Loader/>
			) : (
				<div className="flex flex-wrap items-center justify-around gap-10 px-10">
					{books.map((book) => (
						<BookCard
							key={book._id}
							book={book}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default HomePage
