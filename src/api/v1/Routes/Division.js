import express from "express";
import { addDivision, deleteDivision, getDivision, getDivisions, toggleDivision, updateDivision } from "../Controllers/DivisionController.js";
import { verifyUser } from "../Middlewares/Authentication.js";
import { verifyAdmin } from "../Middlewares/Authorization.js";

const router = express.Router()

//admin
router.get('/', verifyUser, verifyAdmin, getDivisions);
router.post('/', verifyUser, verifyAdmin, addDivision);
router.put("/:uuid", verifyUser, verifyAdmin, updateDivision);
router.get("/:uuid", verifyUser, verifyAdmin, getDivision);
router.delete("/:uuid", verifyUser, verifyAdmin, deleteDivision);
router.put("/:uuid/active", verifyUser, verifyAdmin, toggleDivision);

export default router