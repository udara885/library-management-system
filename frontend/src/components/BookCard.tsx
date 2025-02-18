import { Link } from "react-router"
import { Book } from "../types/types"

const BookCard = ({ book }: { book: Book }) => {
	return (
		<div
			key={book._id}
			className=""
		>
			<Link to={`book/${book._id}`}>
				<img
					className="!w-45 !h-60"
					src={book.image}
					alt={book.title}
				/>
			</Link>
		</div>
	)
}

export default BookCard
