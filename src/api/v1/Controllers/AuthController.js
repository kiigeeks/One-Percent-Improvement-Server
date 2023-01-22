import Users from "../models/User.js";
import bcrypt from 'bcrypt';
import {sendResponse, sendData} from "../Helpers/response.js";
import Divisions from "../models/Division.js";

//login
export const logIn = async (req, res) => {
    try {
        //validation data user
        const user = await Users.findOne({
            where: {
                username: req.body.username
            },
            include: [{
                model: Divisions,
                attributes: ['uuid', 'name', 'statusActive']
            }]
        })
        if(!user) return sendResponse(404, "Username Not Found", res)
        if(user.statusActive === "inactive") return sendResponse(400, "User inactive", res)

        //check password
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return sendResponse(400, "Wrong password", res)

        //set session
        req.session.userUUID = user.uuid
        req.session.userId = user.id

        //send data User without password, updateAt, id, and createdAt
        const {password, updatedAt, id, createdAt, divisionId, ...userLogin} = user.dataValues

        sendData(200, userLogin, "Login successfully", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//logout
export const logOut = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return sendResponse(400, "Can't Logout", res)
        sendResponse(200, "Logout successfully", res)
    })
}

//get user login 
export const getUserLogin = async (req, res) => {
    if(!req.session.userUUID) return sendResponse(401, "Session Not Found", res)

    const user = await Users.findOne({
        where: {
            uuid: req.session.userUUID
        },
        attributes: ['uuid', 'fullname', 'username', 'role', 'statusActive'],
        include: [{
            model: Divisions,
            attributes: ['uuid', 'name', 'statusActive']
        }]
    })

    if(!user) return sendResponse(404, "User Not Found", res)
    
    if(user.statusActive === "inactive") {
        req.session.destroy()
        return sendResponse(400, "User inactive", res)
    }

    sendData(200, user, "Success Get Detail Login User", res)
}