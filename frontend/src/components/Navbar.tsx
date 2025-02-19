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
			<h1 className="font-bold text-2xl md:text-3xl flex items-center gap-2">
				<div className="flex items-center gap-3">
					{isAdmin && (
						<Menu
							size={30}
							onClick={ () => setIsSidebarOpen( !isSidebarOpen ) }
							className="cursor-pointer"
						/>
					)}
					<Link to={`${isAdmin ? "/admin" : "/"}`}>
						<span>{isAdmin ? "Admin Dashboard" : "Home"}</span>
					</Link>
				</div>
			</h1>
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
