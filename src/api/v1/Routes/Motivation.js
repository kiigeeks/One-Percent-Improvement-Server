import express from "express";
import { verifyUser } from "../Middlewares/Authentication.js";
import { verifyAdmin } from "../Middlewares/Authorization.js";
import { createMotivation, getAllMotivations, getRandMotivations, toggleMotivation, updateMotivation } from "../Controllers/MotivationController.js";

const router = express.Router()

//admin
router.post('/', verifyUser, verifyAdmin, createMotivation);
router.put('/:uuid/status', verifyUser, verifyAdmin, toggleMotivation);
router.put('/:uuid', verifyUser, verifyAdmin, updateMotivation);

//all user
router.get('/', verifyUser, getAllMotivations);
router.post('/qod', verifyUser, getRandMotivations);

export default router