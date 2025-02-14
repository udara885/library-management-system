import express from "express"
import {
	addMember,
	deleteMember,
	getMember,
	getMembers,
	updateMember,
} from "../controller/member.controller"

const router = express.Router()

router.get("/members", getMembers)
router.get("/member/:id", getMember)
router.post("/add-member", addMember)
router.put("/update-member/:id", updateMember)
router.delete("/delete-member/:id", deleteMember)

export default router
