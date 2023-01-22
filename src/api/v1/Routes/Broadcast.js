import express from "express";
import { verifyUser } from "../Middlewares/Authentication.js";
import { verifyAdmin } from "../Middlewares/Authorization.js";
import { createBroadcast, deleteBroadcast, getBroadcast, getDetailBroadcast, toggleBroadcast, updateBroadcast } from "../Controllers/BroadcastController.js";

const router = express.Router()

// user all 
router.get('/', verifyUser, getBroadcast);
router.get("/:uuid", verifyUser, getDetailBroadcast);

//admin
router.post('/', verifyUser, verifyAdmin, createBroadcast);
router.put("/:uuid", verifyUser, verifyAdmin, updateBroadcast);
router.delete("/:uuid", verifyUser, verifyAdmin, deleteBroadcast);
router.put("/:uuid/status", verifyUser, verifyAdmin, toggleBroadcast);

export default router