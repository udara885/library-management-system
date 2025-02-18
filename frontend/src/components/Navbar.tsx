import { CircleUserRound, Menu } from "lucide-react"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"
import { useContext } from "react"
import { SidebarContext } from "../context/sidebarContext"

const Navbar = () => {
	const adminContext = useContext(AdminContext)

	const sidebarContext = useContext(SidebarContext)

	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}

	if (!sidebarContext) {
		throw new Error("sidebarContext is undefined")
	}

	const { isAdmin, setIsAdmin } = adminContext

	const { isSidebarOpen, setIsSidebarOpen } = sidebarContext	

	return (
		<div className="p-5 border-b border-gray-800 max-w-screen-xl mx-auto flex justify-between text-gray-200">
			<Link to={`${isAdmin ? "/admin" : "/"}`}>
				<h1 className="font-bold text-2xl md:text-3xl flex items-center gap-2">
					{isAdmin ? (
						<div className="flex items-center gap-3">
							<Menu
								size={30}
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							/>
							<div>Admin Dashboard</div>
						</div>
					) : (
						"Home"
					)}
				</h1>
			</Link>
			<div className="flex gap-2 items-center">
				{!isAdmin && (
					<Link to={"/admin"}>
						<button
							onClick={() => setIsAdmin(!isAdmin)}
							className="border-gray-600 border p-1 md:p-2 rounded-lg font-semibold cursor-pointer"
						>
							<CircleUserRound />
						</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Navbar
