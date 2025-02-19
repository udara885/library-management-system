import { PenLine, Trash } from "lucide-react"
import { Rent } from "../types/types"
import { Link } from "react-router"
import { useRentStore } from "../store/rent"
import toast from "react-hot-toast"
import { useState } from "react"

const RentTable = ({
	filteredRents,
}: {
	filteredRents: Rent[] | undefined
}) => {
	const [rents, setRents] = useState(filteredRents)

	const { deleteRent } = useRentStore()

	const handleDelete = async (id: string | undefined): Promise<void> => {
		if (!id) {
			throw new Error("id is undefined")
		}
		const { success, message } = await deleteRent(id)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			setRents((prevRents) =>
				prevRents?.filter((rent) => rent._id !== id)
			)
		}
	}

	return (
		<div className="overflow-x-auto rounded-xl">
			<table className="min-w-full bg-gray-800 text-gray-200">
				<thead className="bg-gray-800 whitespace-nowrap text-lg">
					<tr>
						<th className="p-4 text-left font-semibold">Rent ID</th>
						<th className="p-4 text-left font-semibold">
							Member ID
						</th>
						<th className="p-4 text-left font-semibold">Book ID</th>
						<th className="p-4 text-left font-semibold">
							From Date
						</th>
						<th className="p-4 text-left font-semibold">To Date</th>
						<th className="p-4 text-left font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody className="whitespace-nowrap">
					{rents?.map((rent) => (
						<tr
							key={rent._id}
							className="hover:bg-gray-600 bg-gray-700 cursor-pointer"
						>
							<td className="p-4">
								{rent._id?.split("").slice(21)}
							</td>
							<td className="p-4">
								{rent.memberId.split("").slice(21)}
							</td>
							<td className="p-4">
								{rent.bookId.split("").slice(21)}
							</td>
							<td className="p-4">{rent.fromDate}</td>
							<td className="p-4">{rent.toDate}</td>
							<td className="flex items-center p-4 gap-3">
								<Link to={`/admin/update-rent/${rent._id}`}>
									<PenLine className="text-blue-400" />
								</Link>
								<Trash
									className="text-red-400"
									onClick={() => handleDelete(rent._id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default RentTable
