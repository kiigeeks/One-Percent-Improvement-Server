import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import db from "./src/config/Database.js";
import SequelizeStore from "connect-session-sequelize"
import Users from "./src/api/v1/Models/User.js";
import bcrypt from 'bcrypt';
import Divisions from "./src/api/v1/Models/Division.js";
import Improvements from "./src/api/v1/Models/improvement.js";
import Motivations from "./src/api/v1/Models/Motivation.js";
import divisionRoute from "./src/api/v1/Routes/Division.js";
import userRoute from "./src/api/v1/Routes/User.js";
import improvementRoute from "./src/api/v1/Routes/improvement.js";
import authRoute from "./src/api/v1/Routes/Auth.js"
import motivationRoute from "./src/api/v1/Routes/Motivation.js"
import broadcastRoute from "./src/api/v1/Routes/Broadcast.js"
import fileUpload from 'express-fileupload';
import Broadcasts from "./src/api/v1/Models/Broadcast.js";

dotenv.config();
const app = express();
app.use(morgan("common"));

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db:db 
})

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:3000', 'http://localhost:3001']
// }))
//all access
app.use(cors({origin: true, credentials: true}));

app.use(fileUpload())
// app.use(express.static('public'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "./public/images")))

try {
    await db.authenticate();
    console.log('Database Connected');

    await Divisions.sync();
    await Divisions.create({
        name: "Human Capital"
    });

    await Users.sync();
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("123456", salt);
    await Users.create({
        username: "admin",
        fullname: "admin",
        password: hashPassword,
        role: "admin",
        divisionId: 1
    });
    
    await Improvements.sync();
    await Motivations.sync();
    await Broadcasts.sync();
} catch (error) {
    console.log(error.message);
}

app.use(express.json())

app.use("/api/division", divisionRoute)
app.use("/api/user", userRoute)
app.use("/api/improvement", improvementRoute)
app.use("/api/auth", authRoute)
app.use("/api/motivation", motivationRoute)
app.use("/api/broadcast", broadcastRoute)

store.sync();

app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`Server Backend Running at http://localhost:${process.env.APP_PORT}`);
})