import { create } from "zustand"
import { Rent } from "../types/types"

type RentState = {
	rents: Rent[]
	setRents: (rents: Rent[]) => void
	addRent: (newRent: Rent) => Promise<{
		success: boolean
		message: string
	}>
	getRents: () => void
	getRent: (id: string) => Promise<{
		success: boolean
		data: Rent
	}>
	updateRent: (
		id: string,
		updatedRent: Rent
	) => Promise<{
		success: boolean
		message: string
	}>
	deleteRent: (id: string) => Promise<{
		success: boolean
		message: string
	}>
}

export const useRentStore = create<RentState>((set) => ({
	rents: [],
	setRents: (rents) => set({ rents }),
	getRents: async () => {
		const res = await fetch("/api/rents")
		const data = await res.json()
		set({ rents: data.data })
	},
	getRent: async (id) => {
		const res = await fetch(`/api/rent/${id}`)
		const data = await res.json()
		return { success: true, data: data.data }
	},
	addRent: async (newRent) => {
		if (
			!newRent.memberId ||
			!newRent.bookId ||
			!newRent.fromDate ||
			!newRent.toDate
		) {
			return { success: false, message: "Please fill out all fields" }
		}
		const res = await fetch("/api/add-rent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newRent),
		})
		const data = await res.json()
		set((state) => ({ rents: [...state.rents, data.data] }))
		return { success: true, message: "Book rented successfully" }
	},
	updateRent: async (id, updatedRent) => {
		const res = await fetch(`/api/update-rent/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedRent),
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			rents: state.rents.map((rent) =>
				rent._id === id ? data.data : rent
			),
		}))
		return { success: true, message: "Rent updated" }
	},
	deleteRent: async (id) => {
		const res = await fetch(`/api/delete-rent/${id}`, {
			method: "DELETE",
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			rents: state.rents.filter((rent) => rent._id === id),
		}))
		return { success: true, message: data.message }
	},
}))
