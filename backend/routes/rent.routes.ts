import express from "express"
import {
	addRent,
	deleteRent,
	getRent,
	getRents,
	updateRent,
} from "../controller/rent.controller"

const router = express.Router()

router.get("/rents", getRents)
router.get("/rent/:id", getRent)
router.post("/add-rent", addRent)
router.put("/update-rent", updateRent)
router.delete("/delete-rent", deleteRent)

export default router
