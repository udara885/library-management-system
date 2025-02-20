import { useContext, useEffect, useState } from "react"
import { Rent } from "../types/types"
import { CirclePlus, Search } from "lucide-react"
import { Link } from "react-router"
import Loader from "../components/Loader"
import { AdminContext } from "../context/adminContext"
import { useRentStore } from "../store/rent"
import RentTable from "../components/RentTable"

const RentPage = () => {
	const { getRents, rents } = useRentStore()

	const [searchItem, setSearchItem] = useState("")

	const [filteredRents, setFilteredRents] = useState<Rent[]>()

	const [loading, setLoading] = useState(true)

	const adminContext = useContext(AdminContext)

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	const { isAdmin } = adminContext

	const handleInputChange = (e: { target: { value: string } }) => {
		const searchTerm = e.target.value
		setSearchItem(searchTerm)
		const filteredRents = rents.filter((rent) =>
			rent.bookId.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredRents(filteredRents)
	}

	useEffect(() => {
		const fetchRents = async () => {
			setLoading(true)
			await getRents()
			setLoading(false)
		}
		fetchRents()
	}, [getRents])

	useEffect(() => {
		setFilteredRents(rents)
	}, [rents])

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
								placeholder="Search Rents"
								value={searchItem}
								onChange={handleInputChange}
							/>
							<div className="absolute right-0 inset-y-0 pr-3 flex items-center justify-center text-gray-500 pointer-events-none">
								<Search />
							</div>
						</div>

						{isAdmin && (
							<Link to={"/admin/rent-book"}>
								<button className="bg-blue-400 px-5 py-2 rounded-full font-bold flex md:text-lg gap-1 items-center">
									<CirclePlus />
									Add
								</button>
							</Link>
						)}
					</div>
					<div className="w-full p-5">
						{filteredRents?.length !== 0 ? (
								<RentTable filteredRents={filteredRents} />
						) : (
							<p className="text-gray-400 font-semibold text-lg flex justify-center">
								No Rents found
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default RentPage
