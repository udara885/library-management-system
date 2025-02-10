import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import { useState } from "react"
import AddPage from "./pages/AddPage"
import UpdatePage from "./pages/UpdatePage"
import BookDetailPage from "./pages/BookDetailPage"
import { AdminContext } from "./context/adminContext"
import { Toaster } from "react-hot-toast"

function App() {
	const [isAdmin, setIsAdmin] = useState(false)

	return (
		<div className="bg-gray-900 min-h-screen">
			<AdminContext.Provider value={ { isAdmin, setIsAdmin } }>
				<Toaster/>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="book/:id"
						element={<BookDetailPage />}
					/>
					<Route
						path="/admin"
						element={<AdminPage />}
					>
						<Route
							index
							element={<HomePage />}
						/>
						<Route
							path="add-book"
							element={<AddPage />}
						/>
						<Route
							path="update-book/:id"
							element={<UpdatePage />}
						/>
						<Route
							path="book/:id"
							element={<BookDetailPage />}
						/>
					</Route>
				</Routes>
			</AdminContext.Provider>
		</div>
	)
}

export default App
