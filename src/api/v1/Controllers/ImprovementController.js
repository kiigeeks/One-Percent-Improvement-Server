import Users from "../models/User.js";
import Divisions from "../models/Division.js";
import { Op, Sequelize } from "sequelize";
import Improvements from "../Models/improvement.js";
import {sendResponse, sendData, sendDataScroll} from "../Helpers/response.js";
import { getDate, getRangeMonths, getLastWeeks } from "../Helpers/customDate.js";

//get all improvement
export const getImprovements = async (req, res) => {
    try {
        const improvements = await Improvements.findAll({
            attributes: ['uuid', 'message', 'note', 'status', 'userId', 'createdAt'],
            include: [{
                model: Users,
                attributes: ['uuid', 'fullname', 'username', 'divisionId', 'role', 'statusActive'],
                include: [{
                    model: Divisions,
                    attributes: ['uuid', 'name', 'statusActive']
                }]
            }]
        })
        sendData(200, improvements, "Success Get All Improvements", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//create my improvement
export const createMyImprovement = async (req, res) => {
    try {
        console.log("jalan");
        const { message } = req.body
        if(!message) return sendResponse(400, "Data is null", res)

        //validation check improvement today & unreviewed 
        // get and set range date 
        let dateTimeNow = new Date()
        const dateStart = getDate(dateTimeNow) + " 00:00:00"
        const dateEnd = getDate(dateTimeNow) + " 23:59:59"
        const checkMyImprov = await Improvements.findOne({
            where: {
                userId: req.session.userId,
                [Op.or]: [
                    {
                        createdAt: {
                            [Op.between]: [ dateStart, dateEnd ]
                        }
                    }, {
                        status: "progress"
                    }
                ]
            }
        })

        if(checkMyImprov?.dataValues.status === "progress") return sendResponse(400, "You have unreviewed improvement", res)
        if(checkMyImprov) return sendResponse(400, "You have already improvement today", res)

        //insert data
        await Improvements.create({
            message,
            userId: req.session.userId,
        })
        sendResponse(201, "Success add improvement today", res)

    } catch (error) {
        sendResponse(500, error.message, res)
        console.log(req.body);
    }
}

//get all my improvement
export const getMyImprovement = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.userUUID
            }
        })
        if(!user) return sendResponse(404, "User not found", res)

        const myImprovements = await Improvements.findAll({
            where: {
                userId: user.id
            },
            attributes: ['uuid', 'message', 'note', 'status', 'createdAt', 'updatedAt'],
            include: [{
                model: Users,
                attributes: ['uuid', 'fullname', 'username', 'divisionId', 'role', 'statusActive'],
                include: [{
                    model: Divisions,
                    attributes: ['uuid', 'name', 'statusActive']
                }]
            }]
        })
        sendData(200, myImprovements, "Success Get All My Improvements", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//get all my improvement by scroll
export const getMyImprovements = async (req, res) => {
    try {
        const lastID = parseInt(req.query.lastID) || 0
        const limit = parseInt(req.query.limit) || 0
        
        let myImprovements = []
        if (lastID < 1) {
            const results = await Improvements.findAll({
                where: {
                    userId: req.session.userId
                },
                limit: limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: ['id', 'uuid', 'message', 'note', 'status', 'createdAt', 'updatedAt'],
                include: [{
                    model: Users,
                    attributes: ['uuid', 'fullname', 'username', 'divisionId', 'role', 'statusActive'],
                    include: [{
                        model: Divisions,
                        attributes: ['uuid', 'name', 'statusActive']
                    }]
                }]
            })
            myImprovements = results
        } else {
            const results = await Improvements.findAll({
                where: {
                    userId: req.session.userId,
                    id: {
                        [Op.lt]: lastID
                        //Op.lt (less than)
                    }
                },
                limit: limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: ['id', 'uuid', 'message', 'note', 'status', 'createdAt', 'updatedAt'],
                include: [{
                    model: Users,
                    attributes: ['uuid', 'fullname', 'username', 'divisionId', 'role', 'statusActive'],
                    include: [{
                        model: Divisions,
                        attributes: ['uuid', 'name', 'statusActive']
                    }]
                }]
            })
            myImprovements = results
        }

        sendDataScroll(
            200, 
            myImprovements, 
            myImprovements.length ? myImprovements[myImprovements.length - 1].id : 0, 
            myImprovements.length >= limit ? true : false,
            "Success Get All My Improvements", 
            res
        )
        
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//update my improvement
export const updateMyImprovement = async (req, res) => {
    try {
        const { message } = req.body
        
        //validation data
        if(!message) return sendResponse(400, "Data is null", res)

        //get data by uuid
        const improvement = await Improvements.findOne({
            where: {
                uuid: req.params.uuid
            }
        })

        if(!improvement) return sendResponse(404, "Improvement not found", res)

        //check user improvement 
        if(req.session.userId !== improvement.userId) return sendResponse(403, "Access denied to edit improvement", res)
        
        //check updated improvement
        if(new Date(improvement.updatedAt).valueOf() !== new Date(improvement.createdAt).valueOf()) return sendResponse(400, "Improvement already updated today", res)
    
        await Improvements.update({
            message
        }, {
            where: {
                id: improvement.id
            }
        })

        sendResponse(200, "Success update your improvement", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//review my improvement
export const reviewMyImprovement = async (req, res) => {
    try {
        const { note, status } = req.body

        // validation data 
        if(!note | !status) return sendResponse(400, "Data is null", res)

        //get data by uuid
        const improvement = await Improvements.findOne({
            where: {
                uuid: req.params.uuid
            }
        })

        if(!improvement) return sendResponse(404, "Improvement not found", res)

        //check user improvement 
        if(req.session.userId !== improvement.userId) return sendResponse(403, "Access denied to review improvement", res)
        
        //check review improvement
        if(improvement.note !== null) return sendResponse(400, "Improvement already reviewed", res)

        await Improvements.update({
            note,
            status
        }, {
            where: {
                id: improvement.id
            }
        })

        sendResponse(200, "Success review your improvement", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//percentage my improvement
export const percentageMyImprovement = async (req, res) => {
    try {
        let dateTimeNow = new Date()
        let myImprovements
        const user = await Users.findOne({
            where: {
                uuid: req.params.userUUID
            }
        })

        if(!user) return sendResponse(404, "User not found", res)

        if(req.params.range === "0") {
            //all time
            myImprovements = await Improvements.findAll({
                where: {
                    userId: user.id,
                },
                attributes: ['uuid', 'status', 'createdAt', 'updatedAt'],
            })
        } else {
            // set range date 
            const dateEnd = getDate(dateTimeNow) + " 23:59:59"
            dateTimeNow.setMonth(dateTimeNow.getMonth()-req.params.range)
            const dateStart = getDate(dateTimeNow) + " 00:00:00"
            myImprovements = await Improvements.findAll({
                where: {
                    userId: user.id,
                    createdAt: {
                        [Op.between]: [ dateStart, dateEnd ]
                    }
                },
                attributes: ['uuid', 'status', 'createdAt', 'updatedAt'],
            })
        }
        sendData(200, myImprovements, "Success Get All My Improvements", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const getChartImprovement = async (req, res) => {
    try {
        let datas =[]
        let dateTimeNow = new Date()

        const monthNames = [
            "Jan", 
            "Feb", 
            "Mar", 
            "Apr", 
            "May", 
            "Jun",
            "Jul", 
            "Aug", 
            "Sep", 
            "Oct", 
            "Nov", 
            "Dec"
        ]
        
        //1 = last week (7 days)
        //2 = 5 months
        //3 = 1 years (12 months)
        
        if (req.params.range === "1") {
            //1 = last week (7 days)
            dateTimeNow.setDate(dateTimeNow.getDate()-6)
            datas = getLastWeeks(dateTimeNow)

            await Promise.all(
                datas.map(async (data, i) => {
                    let timeStart = data.time + " 00:00:00"
                    let timeEnd = data.time + " 23:59:59"
                    const improvements = await Improvements.findAll({
                        where: {
                            createdAt: {
                                [Op.between]: [ timeStart, timeEnd ]
                            }
                        },
                    })
                    datas[i] = { label: data.time, values: improvements.length};
                })
            )

        } else if (req.params.range === "2"){
            // 5 month
            dateTimeNow.setMonth(dateTimeNow.getMonth()-4)
            datas = getRangeMonths(dateTimeNow)

            await Promise.all(
                datas.map(async (data, i) => {
                    const improvements = await Improvements.findAll({
                        where: {
                            createdAt: Sequelize.where(
                                Sequelize.fn("YEAR", Sequelize.col("createdAt")),
                                data.years
                            ),
                            createdAt:Sequelize.where(
                                Sequelize.fn("MONTH", Sequelize.col("createdAt")),
                                data.months
                            ),
                        },
                    })

                    datas[i] = { 
                        label: monthNames[data.months-1]+" "+data.years,
                        values: improvements.length
                    }
                })
            )

        } else if (req.params.range === "3"){
            //3 = 1 years (12 months)
            dateTimeNow.setMonth(dateTimeNow.getMonth()-11)
            datas = getRangeMonths(dateTimeNow)

            await Promise.all(
                datas.map(async (data, i) => {
                    const improvements = await Improvements.findAll({
                        where: {
                            createdAt: Sequelize.where(
                                Sequelize.fn("YEAR", Sequelize.col("createdAt")),
                                data.years
                            ),
                            createdAt:Sequelize.where(
                                Sequelize.fn("MONTH", Sequelize.col("createdAt")),
                                data.months
                            ),
                        },
                    })

                    datas[i] = { 
                        label: monthNames[data.months-1]+" "+data.years,
                        values: improvements.length
                    }
                })
            )
        } else {
            return sendResponse(500, "Unknown Range", res)
        }

        sendData(200, datas, "Success Get Chart", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const getBestImprovement = async (req, res) => {
    try { 
        let bestEmployees = []
        const users = await Users.findAll({ 
            where: {
                statusActive: "active"
            },
            include: [{
                model: Divisions,
                attributes: ['uuid', 'name']
            }]
        })

        await Promise.all(
            users.map(async (user, i) => {
                const improvements = await Improvements.findAll({
                    where: {
                        userId: user.id,
                    }
                })

                const times = improvements.length
                const done = Math.floor(((improvements.filter((data) => data.status === "done")).length/times)*100)
            
                const {uuid, fullname} = user;
                bestEmployees.push({uuid, fullname, division: user.Division.name, times, done })
            })
        )

        sendData(200, bestEmployees, "Success Get Best Employees", res)
    } catch (error) {
        sendResponse(500, error.message, res)
        console.log(error);
    }
}

