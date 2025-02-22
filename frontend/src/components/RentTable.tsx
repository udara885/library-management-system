import { CircleCheck, PenLine, Trash } from "lucide-react"
import { Rent } from "../types/types"
import { Link } from "react-router"
import { useRentStore } from "../store/rent"
import toast from "react-hot-toast"
import { useState } from "react"
import { useBookStore } from "../store/book"

const RentTable = ({
	filteredRents,
}: {
	filteredRents: Rent[] | undefined
}) => {
	const [rents, setRents] = useState(filteredRents)

	const { deleteRent, updateRent } = useRentStore()

	const { getBook, updateBook } = useBookStore()

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

	const handleReturn = async (id: string, rent: Rent) => {
		const { success, message } = await updateRent(id, rent)
		if (!success) {
			toast.error(message)
		} else {
			const res = await getBook(rent.bookId)
			if ("data" in res) {
				await updateBook(rent.bookId, {
					...res.data,
					quantity: res.data.quantity + 1,
				})
			}
			toast.success(message)
			setRents((prevRents) =>
				prevRents?.map((rent) =>
					rent._id === id ? { ...rent, status: "Returned" } : rent
				)
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
						<th className="p-4 text-left font-semibold">Status</th>
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
								{rent._id?.split("").slice(19)}
							</td>
							<td className="p-4">
								{rent.memberId.split("").slice(19)}
							</td>
							<td className="p-4">
								{rent.bookId.split("").slice(19)}
							</td>
							<td className="p-4">{rent.fromDate}</td>
							<td className="p-4">{rent.toDate}</td>
							<td
								className={`${
									rent.status === "Returned"
										? "text-green-400"
										: "text-red-400"
								} font-medium p-4`}
							>
								{rent.status}
							</td>
							<td className="flex items-center p-4 gap-3">
								{rent.status === "Not returned" && (
									<>
										<CircleCheck
											className="text-green-400"
											onClick={() =>
												rent._id &&
												handleReturn(rent._id, {
													...rent,
													status: "Returned",
												})
											}
										/>
										<Link
											to={`/admin/update-rent/${rent._id}`}
										>
											<PenLine className="text-blue-400" />
										</Link>
									</>
								)}
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
