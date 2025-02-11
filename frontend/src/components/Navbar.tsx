import { BookPlus, CircleUserRound, LogOut } from "lucide-react"
import { Link } from "react-router"
import { AdminContext } from "../context/adminContext"
import { useContext } from "react"

const Navbar = () => {
	const adminContext = useContext(AdminContext)
	if (!adminContext) {
		throw new Error("adminContext is undefined")
	}
	const { isAdmin, setIsAdmin } = adminContext
	return (
		<div className="p-5 border-b border-gray-800 max-w-screen-xl mx-auto">
			<div className="flex items-center justify-between text-gray-200">
				<Link to={`${isAdmin ? "/admin" : "/"}`}>
					<h1 className="font-bold text-2xl md:text-3xl">
						{isAdmin ? "Admin Dashboard" : "Home"}
					</h1>
				</Link>
				<div className="flex gap-2 items-center">
					{isAdmin && (
						<Link to="/admin/add-book">
							<button className="border-gray-600 border p-1 md:p-2 rounded-lg font-semibold cursor-pointer">
								<BookPlus />
							</button>
						</Link>
					)}
					<Link to={`${isAdmin ? "/" : "/admin"}`}>
						<button
							onClick={() => setIsAdmin(!isAdmin)}
							className="border-gray-600 border p-1 md:p-2 rounded-lg font-semibold cursor-pointer"
						>
							{isAdmin ? <LogOut /> : <CircleUserRound />}
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
