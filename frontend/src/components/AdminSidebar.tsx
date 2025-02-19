import { BookCopy, BookUp2, LogOut, Users, X } from "lucide-react"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"
import { useContext } from "react"
import { SidebarContext } from "../context/sidebarContext"

const AdminSidebar = () => {
	const adminContext = useContext(AdminContext)

	const sidebarContext = useContext(SidebarContext)

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	if (!sidebarContext) {
		throw new Error("sidebarContext is undefined")
	}

	const { isAdmin, setIsAdmin } = adminContext

	const { setIsSidebarOpen } = sidebarContext

	return (
		<div className="w-1/2 sm:w-1/4 text-gray-200 bg-gray-800 fixed top-0 left-0 z-50 h-full flex flex-col items-center justify-center">
			<span
				className="fixed top-0 right-1/2 sm:right-3/4 sm:p-5 p-3 cursor-pointer hover:text-red-400"
				onClick={() => setIsSidebarOpen(false)}
			>
				<X size={30} />
			</span>
			<h1 className="text-2xl md:text-3xl font-semibold py-10">Menu</h1>
			<ul className="flex flex-col gap-7 md:gap-10 text-xl md:text-2xl font-semibold px-10 py-4">
				<Link to={"/admin/books"}>
					<li className="flex gap-3 cursor-pointer items-center hover:text-blue-400">
						<BookCopy />
						Books
					</li>
				</Link>
				<Link to={"/admin/members"}>
					<li className="flex gap-3 cursor-pointer items-center hover:text-blue-400">
						<Users />
						Members
					</li>
				</Link>
				<Link to={"/admin/rents"}>
					<li className="flex gap-3 cursor-pointer items-center hover:text-blue-400">
						<BookUp2 />
						Rent
					</li>
				</Link>
				<Link to="/">
					<li
						className="flex gap-3 items-center hover:text-blue-400"
						onClick={() => setIsAdmin(!isAdmin)}
					>
						<LogOut />
						Log out
					</li>
				</Link>
			</ul>
		</div>
	)
}

export default AdminSidebar
