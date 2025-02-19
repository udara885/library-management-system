import { MouseEvent, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useMemberStore } from "../store/member"
import { Member } from "../types/types"

const AddMemberPage = () => {
	const [newMember, setNewMember] = useState<Member>({
		name: "",
		email: "",
		phone: "",
	})

	const navigate = useNavigate()

	const { addMember } = useMemberStore()

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const { success, message } = await addMember(newMember)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			navigate(-1)
			setNewMember({
				name: "",
				email: "",
				phone: "",
			})
		}
	}

	const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		navigate(-1)
	}

	return (
		<div className="max-w-screen-sm flex flex-col mx-auto gap-5 p-5">
			<h1 className="font-bold text-gray-200 text-xl md:text-2xl text-center">
				Add New Member
			</h1>
			<form className="flex flex-col w-full gap-5">
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Member Name"
					type="text"
					name="name"
					value={newMember.name}
					onChange={(e) => {
						setNewMember({
							...newMember,
							name: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Email"
					type="email"
					name="email"
					value={newMember.email}
					onChange={(e) => {
						setNewMember({
							...newMember,
							email: e.target.value,
						})
					}}
				/>
				<input
					className="border border-gray-500 rounded text-white p-2 focus:border-blue-500 outline-none"
					placeholder="Phone"
					type="text"
					name="phone"
					value={newMember.phone}
					onChange={(e) => {
						setNewMember({
							...newMember,
							phone: e.target.value,
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
	)
}

export default AddMemberPage
