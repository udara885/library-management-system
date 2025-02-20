import Navbar from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router"
import AdminPage from "./pages/AdminPage"
import { useEffect, useState } from "react"
import AddPage from "./pages/AddPage"
import UpdatePage from "./pages/UpdatePage"
import BookDetailPage from "./pages/BookDetailPage"
import { AdminContext } from "./context/adminContext"
import { Toaster } from "react-hot-toast"
import AddMemberPage from "./pages/AddMemberPage"
import UpdateMemberPage from "./pages/UpdateMemberPage"
import UpdateRentPage from "./pages/UpdateRentPage"
import { SidebarContext } from "./context/sidebarContext"
import MemberPage from "./pages/MemberPage"
import AdminSidebar from "./components/AdminSidebar"
import AddRentPage from "./pages/AddRentPage"
import RentPage from "./pages/RentPage"
import BookPage from "./pages/BookPage"

function App() {
	const [isAdmin, setIsAdmin] = useState(false)

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/admin") {
			setIsAdmin(true)
		}
	}, [location.pathname])

	return (
		<div className="bg-gray-900 min-h-screen">
			<AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
				<SidebarContext.Provider
					value={{ isSidebarOpen, setIsSidebarOpen }}
				>
					<Toaster />
					<Navbar />
					{isAdmin && isSidebarOpen && <AdminSidebar />}
					<Routes>
						<Route
							path="/"
							element={<BookPage />}
						/>
						<Route
							path="/book/:id"
							element={<BookDetailPage />}
						/>
						<Route
							path="/admin"
							element={<AdminPage />}
						>
							<Route
								index
								element={<BookPage />}
							/>
							<Route
								path="books"
								element={<BookPage />}
							/>
							<Route
								path="members"
								element={<MemberPage />}
							/>
							<Route
								path="rents"
								element={<RentPage />}
							/>
							<Route
								path="add-book"
								element={<AddPage />}
							/>
							<Route
								path="rent-book"
								element={<AddRentPage />}
							/>
							<Route
								path="update-rent/:id"
								element={<UpdateRentPage />}
							/>
							<Route
								path="update-book/:id"
								element={<UpdatePage />}
							/>
							<Route
								path="book/:id"
								element={<BookDetailPage />}
							/>
							<Route
								path="add-member"
								element={<AddMemberPage />}
							/>
							<Route
								path="update-member/:id"
								element={<UpdateMemberPage />}
							/>
						</Route>
					</Routes>
				</SidebarContext.Provider>
			</AdminContext.Provider>
		</div>
	)
}

export default App
