import { sendResponse } from "../Helpers/response.js"
import Users from "../models/User.js"

export const verifyAdmin = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userUUID
        }
    })
    
    if(!user) return sendResponse(404, "User Not Found", res)
    if(user.role !== "admin") return sendResponse(403, "Access denied", res)

    next()
}