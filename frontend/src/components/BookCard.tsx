import { Link } from "react-router"
import { Book } from "../types/types"
import { useContext } from "react"
import { AdminContext } from "../context/adminContext"

const BookCard = ( { book }: { book: Book } ) =>
{
	const adminContext = useContext( AdminContext )
	
	if ( !adminContext )
	{
		throw new Error("adminContext is undefined")
	}

	const {isAdmin} = adminContext

	return (
		<div
			key={book._id}
			className=""
		>
			<Link to={isAdmin ? `/admin/book/${book._id}`: `/book/${book._id}`}>
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
