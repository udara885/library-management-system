import mongoose from "mongoose"
import Rent from "../model/rent.model"

export const getRents = async (req: any, res: any) => {
	try {
		const rents = await Rent.find({})
		res.status(200).json({ success: true, data: rents })
	} catch (error: any) {
		console.error(`Error in getRents: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const getRent = async (req: any, res: any) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		const rent = await Rent.findById(id)
		res.status(200).json({ success: true, data: rent })
	} catch (error: any) {
		console.error(`Error in getRent: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const addRent = async (req: any, res: any) => {
	const rent = req.body
	if (!rent.memberId || !rent.bookId || !rent.fromDate || !rent.toDate) {
		return res
			.status(400)
			.json({ success: false, message: "Please fill all the fields" })
	}
	const newRent = new Rent(rent)
	try {
		await newRent.save()
		res.status(201).json({ success: true, data: newRent })
	} catch (error: any) {
		console.error(`Error in addRent: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const updateRent = async (req: any, res: any) => {
	const { id } = req.params
	const rent = req.body
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		const updatedRent = await Rent.findByIdAndUpdate(id, rent, {
			new: true,
		})
		res.status(200).json({ success: true, data: updatedRent })
	} catch (error: any) {
		console.error(`Error in updateRent: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const deleteRent = async (req: any, res: any) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid ID type" })
	}
	try {
		await Rent.findByIdAndDelete(id)
		res.status(200).json({ success: true, message: "Rent deleted" })
	} catch (error: any) {
		console.error(`Error in deleteRent: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}
