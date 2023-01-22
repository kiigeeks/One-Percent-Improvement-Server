import Users from "../models/User.js";
import { Op } from "sequelize";
import {sendResponse, sendData} from "../Helpers/response.js";
import bcrypt from 'bcrypt';
import Divisions from "../models/Division.js";

//get all user
export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['uuid', 'fullname', 'username', 'divisionId', 'role', 'statusActive'],
            include: [{
                model: Divisions,
                attributes: ['uuid', 'name', 'statusActive']
            }]
        })

        sendData(200, users, "Success Get All Users", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//create a new user
export const createUser = async (req, res) => {
    try {
        const { fullname, username, password, divisionId, role } = req.body

        //check values
        if(!role || !divisionId) return sendResponse(400, "Role and Division is null", res)

        //validation username
        const cekUsername = await Users.findOne({
            where: {
                username: username
            }
        })

        if(cekUsername) return sendResponse(400, "Username already exists", res)

        //hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //add data
        await Users.create({
            username,
            password: hashPassword,
            role,
            divisionId,
            fullname
        })
        
        sendResponse(201, "Success Create User", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//get all employees
export const getEmployees = async (req, res) => {
    try {
        const employees = await Users.findAll({
            where: {
                role: "employee"
            },
            attributes: ['uuid', 'fullname', 'username', 'role', 'statusActive', 'createdAt'],
            include: [{
                model: Divisions,
                attributes: ['uuid', 'name', 'statusActive']
            }]
        })

        sendData(200, employees, "Success Get All Employees", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//get detail employee
export const getEmployee = async (req, res) => {
    try {
        const employee = await Users.findOne({
            where: {
                uuid: req.params.uuid,
            },
            attributes: ['uuid', 'fullname', 'username', 'role', 'statusActive'],
            include: [{
                model: Divisions,
                attributes: ['id', 'uuid', 'name', 'statusActive']
            }]
        })

        sendData(200, employee, "Success Get Detail Employee", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//create a new employee
export const addEmployee = async (req, res) => {
    try {
        const { fullname, username, password, divisionId } = req.body

        //cek values
        if(!divisionId) return sendResponse(400, "Division is null", res)

        //validation username
        const cekUsername = await Users.findOne({
            where: {
                username: username
            }
        })

        if(cekUsername) return sendResponse(400, "Username already exists", res)

        //hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //add data
        await Users.create({
            username,
            password: hashPassword,
            divisionId,
            fullname
        })
        
        sendResponse(201, "Success Create Employee", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//active/inactive employee
export const toggleEmployee = async (req, res) => {
    try {
        //validation id employee at db
        const user = await Users.findOne({
            where: {
                uuid: req.params.uuid
            }
        })

        if(!user) return sendResponse(404, "Employee Not Found", res)

        //update active/inactive employee
        if (user.statusActive === "inactive") {
            await Users.update({
                statusActive: "active"
            },{
                where: {
                    uuid: user.uuid 
                }
            })
        } else {
            await Users.update({
                statusActive: "inactive"
            },{
                where: {
                    uuid: user.uuid 
                }
            })
        }

        sendResponse(200, "Success Updated Employee", res)
    }catch (error) {
        sendResponse(500, error.message, res)
    }
}

//update employee
export const updateEmployee = async (req, res) => {
    try {
        const { fullname, username, divisionId, password, newPassword } = req.body

        //cek values
        if(!fullname || !username) return sendResponse(400, "Data is null", res)

        //validation username
        const checkUsername = await Users.findOne({
            where: {
                [Op.and]: [
                    { 
                        uuid: {
                            [Op.ne]: req.params.uuid, 
                        } 
                    },
                    { username: username }
                ]
            }
        })

        if(checkUsername) return sendResponse(400, "Username already exists", res)

        //get user
        const user = await Users.findOne({
            where: 
            {
                uuid: req.params.uuid
            }
        })

        if(!user) return sendResponse(404, "User not found", res)

        let hashPassword
        if(!password){
            hashPassword = user.password
        }else {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        //update employee
        await Users.update({
            fullname,
            username,
            divisionId,
            password: hashPassword
        }, {
            where: {
                id: user.id
            }
        })

        const newEmployee = await Users.findOne({
            where: {
                id: user.id
            },
            include: [{
                model: Divisions,
                attributes: ['id', 'uuid', 'name', 'statusActive']
            }]
        })

        sendData(200, newEmployee, "Success Update Employee", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//update profile user
export const updateProfile = async (req, res) => {
    try {
        const { fullname, username, password, newPassword } = req.body

        //cek values
        if(!fullname || !username) return sendResponse(400, "Data is null", res)

        //validation username
        const checkUsername = await Users.findOne({
            where: {
                [Op.and]: [
                    { 
                        uuid: {
                            //uuid != params uuid
                            [Op.ne]: req.params.uuid, 
                        } 
                    },
                    { username: username }
                ]
            }
        })
        
        if(checkUsername) return sendResponse(400, "Username already exists", res)

        //get user
        const user = await Users.findOne({
            where: 
            {
                uuid: req.params.uuid
            }
        })
        if(!user) return sendResponse(404, "User not found", res)

        //check password
        const match = await bcrypt.compare(password, user.password)
        if(!match) return sendResponse(400, "Wrong password", res)

        let hashPassword
        //validation change password
        if(!newPassword){
            hashPassword = user.password
        }else {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(newPassword, salt);
        }

        //update profile
        await Users.update({
            fullname,
            username,
            password: hashPassword
        }, {
            where: {
                id: user.id
            }
        })

        sendResponse(200, "Success Update User", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}
