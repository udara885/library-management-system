import { useContext, useEffect, useState } from "react"
import { Member } from "../types/types"
import { CirclePlus, Search } from "lucide-react"
import { Link } from "react-router"
import Loader from "../components/Loader"
import { AdminContext } from "../context/adminContext"
import { useMemberStore } from "../store/member"
import MemberTable from "../components/MemberTable"

const MemberPage = () => {
	const { getMembers, members } = useMemberStore()

	const [filteredMembers, setFilteredMembers] = useState<Member[]>()

	const [loading, setLoading] = useState(true)

	const adminContext = useContext(AdminContext)

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	const { isAdmin } = adminContext

	const handleInputChange = (e: { target: { value: string } }) => {
		const searchTerm = e.target.value.trim()
		if (!searchTerm) {
			setFilteredMembers(members)
			return
		}
		const filteredMembers = members.filter((member) => {
			if (!member.name) return false
			return member.name.toLowerCase().includes(searchTerm.toLowerCase())
		})
		setFilteredMembers(filteredMembers)
	}

	useEffect(() => {
		const fetchMembers = async () => {
			setLoading(true)
			await getMembers()
			setLoading(false)
		}
		fetchMembers()
	}, [getMembers])

	useEffect(() => {
		setFilteredMembers(members)
	}, [members])

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
								placeholder="Member Name"
								onChange={handleInputChange}
							/>
							<div className="absolute right-0 inset-y-0 pr-3 flex items-center justify-center text-gray-500 pointer-events-none">
								<Search />
							</div>
						</div>
						{isAdmin && (
							<Link to={"/admin/add-member"}>
								<button className="bg-blue-400 px-5 py-2 rounded-full font-bold flex md:text-lg gap-1 items-center">
									<CirclePlus />
									Add
								</button>
							</Link>
						)}
					</div>
					<div className="w-full p-5">
						{filteredMembers && filteredMembers.length > 0 ? (
							<MemberTable filteredMembers={filteredMembers} />
						) : (
							<p className="text-gray-400 font-semibold text-lg flex justify-center">
								No Members found
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default MemberPage
