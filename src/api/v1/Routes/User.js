import express from "express";
import { createUser, getUsers, updateProfile, getEmployees, addEmployee, toggleEmployee, getEmployee, updateEmployee } from "../Controllers/UserController.js";
import { verifyUser } from "../Middlewares/Authentication.js";
import { verifyAdmin } from "../Middlewares/Authorization.js";

const router = express.Router()

//admin
router.get('/', verifyUser, verifyAdmin, getUsers);
router.post('/', verifyUser, verifyAdmin, createUser);
router.get('/employees', verifyUser, verifyAdmin, getEmployees);
router.get('/employee/:uuid', verifyUser, verifyAdmin, getEmployee);
router.post('/employee', verifyUser, verifyAdmin, addEmployee);
router.put('/:uuid/status', verifyUser, verifyAdmin, toggleEmployee);
router.put('/employee/:uuid', verifyUser, verifyAdmin, updateEmployee);

//all user
router.put('/profile/:uuid', verifyUser, updateProfile);

export default router