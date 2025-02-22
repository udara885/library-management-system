import { MouseEvent, useEffect, useState } from "react"
import { useRentStore } from "../store/rent"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import { Rent } from "../types/types"
import Loader from "../components/Loader"
import { useBookStore } from "../store/book"
import { useMemberStore } from "../store/member"

const UpdateRentPage = () => {
	const { id } = useParams()

	if (!id) {
		throw new Error("id is undefined")
	}

	const [updatedRent, setUpdatedRent] = useState<Rent>({
		memberId: "",
		bookId: ""
	})

  const [ loading, setLoading ] = useState( true )
  
  const { updateRent, getRent } = useRentStore()
  
  const { getBooks, books } = useBookStore()

    const { members, getMembers } = useMemberStore()

	useEffect(() => {
	const fetchRent = async () => {
		setLoading(true)
		const res = await getRent(id)
		if ('data' in res) {
			setUpdatedRent(res.data)
			await getBooks()
			await getMembers()
		} else {
			toast.error(res.message)
		}
		setLoading(false)
	}
		fetchRent()
	}, [getRent, id, getBooks, getMembers])

	const navigate = useNavigate()

	const handleSubmit = async (
		e: MouseEvent<HTMLButtonElement>,
		id: string,
		updatedRent: Rent
	) => {
		e.preventDefault()
		const { success, message } = await updateRent(id, updatedRent)
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
							value={updatedRent.memberId}
							onChange={(e) => {
								setUpdatedRent({
									...updatedRent,
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
							value={updatedRent.bookId}
							onChange={(e) => {
								setUpdatedRent({
									...updatedRent,
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
						<button
							className="bg-blue-400 font-bold rounded p-2 md:text-lg cursor-pointer"
							onClick={(e) => handleSubmit(e, id, updatedRent)}
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

export default UpdateRentPage
