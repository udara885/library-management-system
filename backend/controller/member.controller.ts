import mongoose from "mongoose"
import Member from "../model/member.model"

export const getMembers = async (req: any, res: any) => {
	try {
		const members = await Member.find({})
		res.status(200).json({ success: true, data: members })
	} catch (error: any) {
		console.error(`Error in getMembers: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const getMember = async (req: any, res: any) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		const member = await Member.findById(id)
		res.status(200).json({ success: true, data: member })
	} catch (error: any) {
		console.error(`Error in getMember: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const addMember = async (req: any, res: any) => {
	const member = req.body
	if (!member.name || !member.email || !member.phone) {
		return res
			.status(404)
			.json({ success: false, message: "Please fill all the fields" })
	}
	const newMember = new Member(member)
	try {
		await newMember.save()
		res.status(201).json({ success: true, data: newMember })
	} catch (error: any) {
		console.error(`Error in addMember: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const updateMember = async (req: any, res: any) => {
	const { id } = req.params
	const member = req.body
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		const updatedMember = await Member.findByIdAndUpdate(id, member, {
			new: true,
		})
		res.status(200).json({ success: true, data: updatedMember })
	} catch (error: any) {
		console.error(`Error in updateMember: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const deleteMember = async (req: any, res: any) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		await Member.findByIdAndDelete(id)
		res.status(200).json({ success: true, message: "Member deleted" })
	} catch (error: any) {
		console.error(`Error in deleteMember: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}
