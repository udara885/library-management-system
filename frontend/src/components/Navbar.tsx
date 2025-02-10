import { CircleUserRound, LogOut } from "lucide-react"
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
					<h1 className="font-bold text-xl md:text-2xl">
						{isAdmin
							? "Admin Dashboard"
							: "Library Management System"}
					</h1>
				</Link>
				<Link to={`${isAdmin ? "/" : "/admin"}`}>
					<button
						onClick={() => setIsAdmin(!isAdmin)}
						className="border-gray-600 border p-2 rounded-lg font-semibold"
					>
						{isAdmin ? <LogOut /> : <CircleUserRound />}
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Navbar
