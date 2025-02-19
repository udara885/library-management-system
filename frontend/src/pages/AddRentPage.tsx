import { MouseEvent, useEffect, useState } from "react"
import { useRentStore } from "../store/rent"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { Rent } from "../types/types"
import { useBookStore } from "../store/book"
import { useMemberStore } from "../store/member"
import Loader from "../components/Loader"

const AddRentPage = () => {
	const [newRent, setNewRent] = useState<Rent>({
		memberId: "",
		bookId: "",
		fromDate: "",
		toDate: "",
	})
	const { getBooks, books } = useBookStore()
	const { members, getMembers } = useMemberStore()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true)
			await getMembers()
			await getBooks()
			setLoading(false)
		}
		fetchBooks()
	}, [getBooks, getMembers])

	const navigate = useNavigate()

	const { addRent } = useRentStore()

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const { success, message } = await addRent(newRent)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			navigate(-1)
			setNewRent({
				memberId: "",
				bookId: "",
				fromDate: "",
				toDate: "",
			})
		}
	}

	const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		navigate(-1)
	}

	return (
		<div className="max-w-screen-sm flex flex-col mx-auto gap-5 p-5">
			{loading ? (
				<Loader />
			) : (
				<div>
					<h1 className="font-bold text-gray-200 text-xl md:text-2xl text-center mb-5">
						Rent a Book
					</h1>
					<form className="flex flex-col w-full gap-5">
						<select
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							name="memberId"
							value={newRent.memberId}
							onChange={(e) => {
								setNewRent({
									...newRent,
									memberId: e.target.value,
								})
							}}
						>
							<option className="bg-gray-900">
								Select Member
							</option>
							{members.map((member) => (
								<option
									className="bg-gray-900"
									value={member._id}
									key={member._id}
								>
									{member.name}
								</option>
							))}
						</select>
						<select
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							name="bookId"
							value={newRent.bookId}
							onChange={(e) => {
								setNewRent({
									...newRent,
									bookId: e.target.value,
								})
							}}
						>
							<option className="bg-gray-900">Select Book</option>
							{books.map((book) => (
								<option
									className="bg-gray-900"
									value={book._id}
									key={book._id}
								>
									{book.title}
								</option>
							))}
						</select>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="From Date"
							type="date"
							name="fromDate"
							value={newRent.fromDate}
							onChange={(e) => {
								const date = new Date(e.target.value)
								setNewRent({
									...newRent,
									fromDate: date.toISOString().split("T")[0],
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Image URL"
							type="date"
							name="toDate"
							value={newRent.toDate}
							onChange={(e) => {
								const date = new Date(e.target.value)
								setNewRent({
									...newRent,
									toDate: date.toISOString().split("T")[0],
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
			)}
		</div>
	)
}

export default AddRentPage
