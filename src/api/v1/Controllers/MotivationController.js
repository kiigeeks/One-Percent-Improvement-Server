import { sendData, sendResponse } from "../Helpers/response.js";
import Motivations from "../Models/Motivation.js";
import { Sequelize } from "sequelize";

//create motivation
export const createMotivation = async (req, res) => {
    try {
        //validation
        const { message, author, status } = req.body
        if(!message || !author) return sendResponse(400, "Data is null", res)

        //insert data
        await Motivations.create({
            message,
            author,
            status,
        })

        sendResponse(201, "Success add motivation", res)
    } catch (error) {
        sendResponse(500, error.message, res)   
    }
}

//get all motivation
export const getAllMotivations = async (req, res) => {
    try {
        const motivations = await Motivations.findAll({
            attributes: ['uuid', 'message', 'author', 'status', 'createdAt'],
        })
        sendData(200, motivations, "Success Get All Motivations", res)
    }catch(error) {
        sendResponse(500, error.message, res)  
    }
}

//get random motivation
export const getRandMotivations = async (req, res) => {
    try {
        const motivations = await Motivations.findAll({
            where: {
                status: "active"
            },
            attributes: ['uuid', 'message', 'author', 'status', 'createdAt'],
            order: Sequelize.literal('rand()'), 
            limit: 1
        })
        
        sendData(200, motivations, "Success Get All Motivations", res)
    }catch(error) {
        sendResponse(500, error.message, res)  
    }
}

//update motivation
export const updateMotivation = async (req, res) => {
    try {
        const { message, status, author } = req.body

        //validation id motivation at db
        const motivation = await Motivations.findOne({
            where: {
                uuid: req.params.uuid
            }
        })

        if(!motivation) return sendResponse(404, "Motivation Not Found", res)

        //update motivation
        await Motivations.update({
            message,
            author,
            status
        },{
            where: {
                uuid: motivation.uuid 
            }
        })

        sendResponse(200, "Success Update Motivation", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//toggle motivation
export const toggleMotivation = async (req, res) => {
    try {
        //validation id motivation at db
        const motivation = await Motivations.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        
        if(!motivation) return sendResponse(404, "Motivation Not Found", res)

        //update active/inactive motivation
        if (motivation.status === "inactive") {
            await Motivations.update({
                status: "active"
            },{
                where: {
                    uuid: motivation.uuid 
                }
            })
        } else {
            await Motivations.update({
                status: "inactive"
            },{
                where: {
                    uuid: motivation.uuid 
                }
            })
        }

        sendResponse(200, "Success Updated Motivation", res)
    }catch (error) {
        sendResponse(500, error.message, res)
    }
}

