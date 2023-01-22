import {sendData, sendResponse} from "../Helpers/response.js"
import Divisions from "../models/Division.js"
import { Op } from "sequelize"

//get all division
export const getDivisions = async (req, res) => {
    try {
        const divisions = await Divisions.findAll()
        sendData(200, divisions, "Success Get All Division", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//get details division
export const getDivision = async (req, res) => {
    try {
        const division = await Divisions.findOne({
            where: {
                uuid: req.params.uuid
            }
        })

        sendData(200, division, "Success Get Detail Division", res)
    }catch (error) {
        sendResponse(500, error.message, res)
    }
}

//add new division
export const addDivision = async (req, res) => {
    try {
        //validation name division already exists
        const cekDivision = await Divisions.findOne({
            where: {
                name: req.body.name
            }
        })
        if(cekDivision) return sendResponse(400, "Division already exists", res)

        const division = await Divisions.create(req.body)
        sendData(200, division, "Success Add Division", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//update division
export const updateDivision = async (req, res) => {
    try {
        const { name, statusActive } = req.body

        //validation id division at db
        const division = await Divisions.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        if(!division) return sendResponse(404, "Division Not Found", res)

        //validation name division already exists
        const cekDivision = await Divisions.findOne({
            where: {
                [Op.and]: [
                    { 
                        uuid: {
                            //uuid != params uuid
                            [Op.ne]: req.params.uuid, 
                        } 
                    },
                    { name: name }
                ]
            }
        })
        if(cekDivision) return sendResponse(400, "Name Division already exists", res)

        //update division
        await Divisions.update({
            name,
            statusActive
        },{
            where: {
                uuid: division.uuid 
            }
        })

        //get new update division
        const divisionNew = await Divisions.findOne({
            where: {
                uuid: division.uuid
            }
        })

        sendData(200, divisionNew, "Success Update Division", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//delete division
export const deleteDivision = async (req, res) => {
    try { 
        //validation id division at db
        const division = await Divisions.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        if(!division) return sendResponse(404, "Division Not Found", res)

        //delete division
        await Divisions.destroy({
            where: {
                uuid: division.uuid
            }
        })

        sendData(200, division, "Success Delete Division", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//active/inactive division
export const toggleDivision = async (req, res) => {
    try {
        //validation id division at db
        const division = await Divisions.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        if(!division) return sendResponse(404, "Division Not Found", res)

        //update active/inactive division
        if (division.statusActive === "inactive") {
            await Divisions.update({
                statusActive: "active"
            },{
                where: {
                    uuid: division.uuid 
                }
            })
        } else {
            await Divisions.update({
                statusActive: "inactive"
            },{
                where: {
                    uuid: division.uuid 
                }
            })
        }
        
        //get new update division
        const divisionNew = await Divisions.findOne({
            where: {
                uuid: division.uuid
            }
        })
        
        sendData(200, divisionNew, "Success Toggle Division", res)
    }catch (error) {
        sendResponse(500, error.message, res)
    }
}

