import { sendResponse } from "../Helpers/response.js"
import Users from "../models/User.js"

export const verifyUser = async (req, res, next) => {
    if(!req.session.userUUID) return sendResponse(401, "Session Not Found", res)

    const user = await Users.findOne({
        where: {
            uuid: req.session.userUUID
        }
    })

    if(!user) return sendResponse(404, "User Not Found", res)
    if(user.statusActive === "inactive") return sendResponse(400, "User inactive", res)

    req.userID = user.id
    req.userRole = user.role

    next()
}