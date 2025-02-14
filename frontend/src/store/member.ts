import { create } from "zustand"
import { Member } from "../types/types"

type MemberState = {
	members: Member[]
	setMembers: (members: Member[]) => void
	addMember: (newMember: Member) => Promise<{
		success: boolean
		message: string
	}>
	getMembers: () => void
	getMember: (id: string) => Promise<{
		success: boolean
		data: Member
	}>
	updateMember: (
		id: string,
		updatedMember: Member
	) => Promise<{
		success: boolean
		message: string
	}>
	deleteMember: (id: string) => Promise<{
		success: boolean
		message: string
	}>
}

export const useMemberStore = create<MemberState>((set) => ({
	members: [],
	setMembers: (members) => set({ members }),
	getMembers: async () => {
		const res = await fetch("/api/members")
		const data = await res.json()
		set({ members: data.data })
	},
	getMember: async (id) => {
		const res = await fetch(`/api/member/${id}`)
		const data = await res.json()
		return { success: true, data: data.data }
	},
	addMember: async (newMember) => {
		if (!newMember.name || !newMember.email || !newMember.phone) {
			return { success: false, message: "Please fill out all fields" }
		}
		const res = await fetch("/api/add-member", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newMember),
		})
		const data = await res.json()
		set((state) => ({ members: [...state.members, data.data] }))
		return { success: true, message: "Member added successfully" }
	},
	updateMember: async (id, updatedMember) => {
		const res = await fetch(`/api/update-member/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedMember),
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			members: state.members.map((member) =>
				member._id === id ? data.data : member
			),
		}))
		return { success: true, message: "Member Updated" }
	},
	deleteMember: async (id) => {
		const res = await fetch(`/api/delete-member/${id}`, {
			method: "DELETE",
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			members: state.members.filter((member) => member._id === id),
		}))
		return { success: true, message: data.message }
	},
}))
