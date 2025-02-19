import { PenLine, Trash } from "lucide-react"
import { Member } from "../types/types"
import { useState } from "react"
import toast from "react-hot-toast"
import { useMemberStore } from "../store/member"
import { Link } from "react-router"

const MemberTable = ({
	filteredMembers,
}: {
	filteredMembers: Member[] | undefined
  } ) =>
{
  const [ members, setMembers ] = useState( filteredMembers )

  const { deleteMember } = useMemberStore()
    
  const handleDelete = async (id: string | undefined): Promise<void> => {
		if (!id) {
			throw new Error("id is undefined")
		}
		const { success, message } = await deleteMember(id)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			setMembers((prevMembers) =>
				prevMembers?.filter((rent) => rent._id !== id)
			)
		}
  }

	return (
		<div className="overflow-x-auto rounded-xl">
			<table className="min-w-full bg-gray-800 text-gray-200">
				<thead className="bg-gray-800 whitespace-nowrap text-lg">
					<tr>
						<th className="p-4 text-left font-semibold">
							Member ID
						</th>
						<th className="p-4 text-left font-semibold">Name</th>
						<th className="p-4 text-left font-semibold">Email</th>
						<th className="p-4 text-left font-semibold">Phone</th>
						<th className="p-4 text-left font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody className="whitespace-nowrap">
					{members?.map((member) => (
						<tr
							key={member._id}
							className="hover:bg-gray-600 bg-gray-700 cursor-pointer"
						>
							<td className="p-4">
								{member._id?.split("").slice(21)}
							</td>
							<td className="p-4">{member.name}</td>
							<td className="p-4">{member.email}</td>
							<td className="p-4">{member.phone}</td>
							<td className="flex items-center p-4 gap-3">
								<Link to={`/admin/update-member/${member._id}`}>
									<PenLine className="text-blue-400" />
								</Link>
								<Trash
									className="text-red-400"
									onClick={() => handleDelete(member._id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default MemberTable
