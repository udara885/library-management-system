import { useEffect } from "react"
import BookCard from "../components/BookCard"
import { useBookStore } from "../store/book"

const HomePage = () => {
	const { getBooks, books } = useBookStore()

	useEffect(() => {
		getBooks()
	}, [getBooks])

	return (
		<div className="py-10 max-w-screen-xl mx-auto">
			<div className="flex flex-wrap items-center justify-around gap-10 px-10">
				{books.map((book) => (
					<BookCard key={book._id} book={book} />
				))}
			</div>
		</div>
	)
}

export default HomePage
