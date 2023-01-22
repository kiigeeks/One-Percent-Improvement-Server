import Broadcasts from "../Models/Broadcast.js";
import {sendData, sendResponse} from "../Helpers/response.js"
import path from 'path';
import fs from 'fs';

//get all broadcast
export const getBroadcast = async (req, res) => {
    try {
        const broadcasts = await Broadcasts.findAll({
            attributes: ['uuid', 'title', 'desc', 'flyer', 'status', 'createdAt']
        })
        sendData(200, broadcasts, "Success Get All Broadcast", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//get detail broadcast
export const getDetailBroadcast = async (req, res) => {
    try {
        const bc = await Broadcasts.findOne({
            where: {
                uuid: req.params.uuid,
            }
        })
        sendData(200, bc, "Success Get Detail Broadcast", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//add new broadcast
export const createBroadcast = async (req, res) => {
    try {
        if(req.files === null) {
            if(req.body.status === "active") {
                await Broadcasts.update({
                    status: "inactive"
                },{
                    where: {
                        status: "active"
                    }
                })
            }
            await Broadcasts.create(req.body)
        }else {
            const {title, desc, status} = req.body;
            
            if(status === "active") {
                await Broadcasts.update({
                    status: "inactive"
                },{
                    where: {
                        status: "active"
                    }
                })
            }

            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const url = `broadcast/${fileName}`;

            //validation type file
            const allowedType = ['.png', '.jpg', '.jpeg'];
            if(!allowedType.includes(ext.toLocaleLowerCase())) return sendResponse(422, "File must be image with extension png, jpg, jpeg", res)
            
            //validation size file max 5mb
            if(fileSize > 5000000) return sendResponse(422, "Image must be less than 5 mb", res)
            
            file.mv(`./public/images/broadcast/${fileName}`, async (err) => {
                //validation process upload file to server
                if(err) return sendResponse(502, err.message, res)
                
                await Broadcasts.create({
                    title,
                    desc,
                    flyer: url,
                    status
                });
            })
        }

        sendResponse(200, "Success Create Broadcast", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }

}

//update broadcast
export const updateBroadcast = async (req, res) => {
    try {
        const bc = await Broadcasts.findOne({
            where: {
                uuid: req.params.uuid,
            }
        })
        if(!bc) return sendResponse(404, "Broadcast Not Found", res)

        let fileName = "";

        if(req.files === null) {
            fileName = bc.flyer;
        }else{
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;

            //validation type file
            const allowedType = ['.png', '.jpg', '.jpeg'];
            if(!allowedType.includes(ext.toLocaleLowerCase())) return sendResponse(422, "File must be image with extension png, jpg, jpeg", res)
            
            //validation size file max 5mb
            if(fileSize > 5000000) return sendResponse
            
            const filePath = `./public/images/${bc.flyer}`;
            fs.unlinkSync(filePath);
            console.log(filePath);
            console.log(bc.flyer)
            file.mv(`./public/images/broadcast/${fileName}`, (err) => {
                if(err) return sendResponse(502, err.message, res)
            });
        }

        const {title, desc, status} = req.body;
        const flyer = fileName;

        if (status === "active") {
            await Broadcasts.update({
                status: "inactive"
            },{
                where: {
                    status: "active"
                }
            })
        }

        await Broadcasts.update({
            title,
            desc,
            status,
            flyer
        },{
            where:{
                uuid: req.params.uuid
            }
        });

        sendResponse(201, "Success Update Broadcast", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//delete broadcast
export const deleteBroadcast = async (req, res) => {
    try {
        const bc = await Broadcasts.findOne({
            where: {
                uuid: req.params.uuid,
            }
        })

        if(!bc) return sendResponse(404, "Broadcast Not Found", res)
        if(bc.status === "active") return sendResponse(500, "Broadcast Still Active", res)
        
        if (bc.flyer) {
            const filePath = `./public/images/${bc.flyer}`;
            fs.unlinkSync(filePath);
        }

        await Broadcasts.destroy({
            where:{
                uuid: req.params.uuid
            }
        })

        sendResponse(200, "Success Delete Broadcast", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

//toggle status broadcast
export const toggleBroadcast = async (req, res) => {
    try {
        //validation id broadcast at db
        const bc = await Broadcasts.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        
        if(!bc) return sendResponse(404, "Broadcast Not Found", res)

        //update active/inactive broadcast
        if (bc.status === "inactive") {
            await Broadcasts.update({
                status: "inactive"
            },{
                where: {
                    status: "active"
                }
            })

            await Broadcasts.update({
                status: "active"
            },{
                where: {
                    uuid: bc.uuid 
                }
            })
        } else {
            await Broadcasts.update({
                status: "inactive"
            },{
                where: {
                    uuid: bc.uuid 
                }
            })
        }

        sendResponse(200, "Success Updated Broadcast", res)
    }catch (error) {
        sendResponse(500, error.message, res)
    }
}
