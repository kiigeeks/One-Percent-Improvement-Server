import express from "express";
import { getUserLogin, logIn, logOut } from "../Controllers/AuthController.js";

const router = express.Router()

router.post('/login', logIn);
router.delete('/logout', logOut);
router.get('/me', getUserLogin);

export default router