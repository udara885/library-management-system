import { MouseEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import Loader from "../components/Loader"
import { useMemberStore } from "../store/member"
import { Member } from "../types/types"

const UpdateMemberPage = () => {
	const { id } = useParams()

	if (!id) {
		throw new Error("id is undefined")
	}

	const { updateMember, getMember } = useMemberStore()

	const [updatedMember, setUpdatedMember] = useState<Member>({
		name: "",
		email: "",
		phone: "",
	})

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMember = async () => {
			setLoading(true)
			const { data } = await getMember(id)
			setUpdatedMember(data)
			setLoading(false)
		}
		fetchMember()
	}, [getMember, id])

	const navigate = useNavigate()

	const handleSubmit = async (
		e: MouseEvent<HTMLButtonElement>,
		id: string,
		updatedMember: Member
	) => {
		e.preventDefault()
		const { success, message } = await updateMember(id, updatedMember)
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
		<div>
			{loading ? (
				<Loader />
			) : (
				<div className="max-w-screen-sm flex flex-col mx-auto gap-5 p-5">
					<h1 className="font-bold text-gray-200 text-xl md:text-2xl text-center">
						Update Member
					</h1>
					<form className="flex flex-col w-full gap-5">
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Book Title"
							type="text"
							name="name"
							value={updatedMember?.name}
							onChange={(e) => {
								setUpdatedMember({
									...updatedMember,
									name: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Author"
							type="email"
							name="email"
							value={updatedMember?.email}
							onChange={(e) => {
								setUpdatedMember({
									...updatedMember,
									email: e.target.value,
								})
							}}
						/>
						<input
							className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
							placeholder="Category"
							type="text"
							name="phone"
							value={updatedMember?.phone}
							onChange={(e) => {
								setUpdatedMember({
									...updatedMember,
									phone: e.target.value,
								})
							}}
						/>
						<button
							className="bg-blue-400 font-bold rounded p-2 md:text-lg cursor-pointer"
							onClick={(e) => handleSubmit(e, id, updatedMember)}
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

export default UpdateMemberPage
