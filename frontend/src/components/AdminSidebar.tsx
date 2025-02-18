import { BookCopy, BookUp2, LogOut, Users, X } from "lucide-react"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"
import { useContext } from "react"
import { SidebarContext } from "../context/sidebarContext"

const AdminSidebar = ({ setView }: { setView: (view: number) => void }) => {
	const adminContext = useContext(AdminContext)

	const sidebarContext = useContext(SidebarContext)

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	if (!sidebarContext) {
		throw new Error("sidebarContext is undefined")
	}

  const { isAdmin, setIsAdmin } = adminContext
  
  const {setIsSidebarOpen} = sidebarContext

	return (
		<div className="w-1/2 text-gray-200 bg-gray-800 fixed top-0 left-0 z-50 h-full flex flex-col items-center">
			<span className="w-full flex justify-end p-4 cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
				<X />
			</span>
			<h1 className="text-2xl md:text-3xl font-semibold py-10">Menu</h1>
			<ul className="flex flex-col gap-7 md:gap-10 text-xl md:text-3xl font-semibold px-10 py-4">
				<li
					className="flex gap-3 cursor-pointer items-center"
					onClick={() => setView(1)}
				>
					<BookCopy />
					Books
				</li>
				<li
					className="flex gap-3 cursor-pointer items-center"
					onClick={() => setView(2)}
				>
					<Users />
					Members
				</li>
				<li
					className="flex gap-3 cursor-pointer items-center"
					onClick={() => setView(3)}
				>
					<BookUp2 />
					Rent
				</li>
				<Link to="/">
					<li
						className="flex gap-3 items-center"
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
