import { useContext, useEffect, useState } from "react"
import BookCard from "../components/BookCard"
import { useBookStore } from "../store/book"
import Loader from "../components/Loader"
import { CirclePlus, Search } from "lucide-react"
import { Book } from "../types/types"
import AdminSidebar from "../components/AdminSidebar"
import { SidebarContext } from "../context/sidebarContext"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"

const HomePage = () => {
	const { getBooks, books } = useBookStore()

	const [loading, setLoading] = useState(true)

	const [filteredBooks, setFilteredbooks] = useState<Book[]>()

	const [searchItem, setSearchItem] = useState("")

	const [view, setView] = useState(1)

	const sidebarContext = useContext( SidebarContext )
	
	const adminContext = useContext(AdminContext)

	if (!sidebarContext) {
		throw new Error("sidebarContext is undefined")
	}

	if ( !adminContext )
	{
		throw new Error("adminContext is undefined")
	}

	const { isSidebarOpen, setIsSidebarOpen } = sidebarContext

	const {isAdmin} = adminContext

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true)
			await getBooks()
			setLoading(false)
		}
		fetchBooks()
	}, [getBooks])

	useEffect(() => {
		setFilteredbooks(books)
		setIsSidebarOpen(false)
	}, [books, setIsSidebarOpen])

	const handleInputChange = (e: { target: { value: string } }) => {
		const searchTerm = e.target.value
		setSearchItem(searchTerm)
		const filteredBooks = books.filter((book) =>
			book.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredbooks(filteredBooks)
	}

	return (
		<div className="py-5 max-w-screen-xl mx-auto">
			{loading ? (
				<Loader />
			) : (
				<div className="flex">
					{isSidebarOpen && <AdminSidebar setView={setView} />}
					<div className="w-full flex flex-col justify-center items-center">
						{view === 1 && (
							<div className="flex flex-col items-center justify-center">
								<div className="flex items-center justify-center gap-2 w-full">
									<div className="relative w-[60%]">
										<input
											type="text"
											className="border border-gray-500 rounded-full w-full text-gray-200 p-2 focus:border-blue-500 outline-none sm:text-center md:text-lg"
											placeholder="Search Books"
											value={searchItem}
											onChange={handleInputChange}
										/>
										<div className="absolute right-0 inset-y-0 pr-3 flex items-center justify-center text-gray-500 pointer-events-none">
											<Search />
										</div>
									</div>
									{isAdmin && <Link to={"/admin/add-book"}>
										<button className="bg-blue-400 px-5 py-2 rounded-full font-bold flex md:text-lg gap-1 items-center">
											<CirclePlus />
											Add
										</button>
									</Link>}
								</div>
								<div className="flex flex-wrap items-center justify-around gap-10 px-10 py-10">
									{filteredBooks?.length !== 0 ? (
										filteredBooks?.map((book) => (
											<BookCard
												key={book._id}
												book={book}
											/>
										))
									) : (
										<p className="text-gray-300 font-semibold text-lg">
											No Books found
										</p>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default HomePage
