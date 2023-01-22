import express from "express";
import { createMyImprovement, getBestImprovement, getChartImprovement, getImprovements, getMyImprovement, getMyImprovements, percentageMyImprovement, reviewMyImprovement, updateMyImprovement } from "../Controllers/ImprovementController.js";
import { verifyUser } from "../Middlewares/Authentication.js";
import { verifyAdmin } from "../Middlewares/Authorization.js";

const router = express.Router()

//admin
router.get('/', verifyUser, verifyAdmin, getImprovements);
router.get('/best' , verifyUser, verifyAdmin, getBestImprovement)

//user
router.post('/', verifyUser, createMyImprovement)
router.get('/me/:userUUID', verifyUser, getMyImprovement)
router.get('/feed', verifyUser, getMyImprovements)
router.put('/:uuid' , verifyUser, updateMyImprovement)
router.put('/review/:uuid' , verifyUser, reviewMyImprovement)
router.get('/percentage/:range/:userUUID' , verifyUser, percentageMyImprovement)
router.get('/chart/:range' , verifyUser, getChartImprovement)

export default router