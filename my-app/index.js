require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require('./db/db.js');
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const groupRoutes = require('./routes/groupRoutes.js');

const cookieParser = require('cookie-parser');
const createWebSocketServer = require("./webServer.js");
const path = require("path");

connectDB();
app.use(express.json())
app.use(cookieParser())

//middlewares
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
    "http://192.168.100.201:5173",
    "http://192.168.31.177:5173",
    "http://192.168.31.177:5174",
    "https://connectrtc-zevy.onrender.com"
];

const corsOptions = {
    origin: allowedOrigins,
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use("/api/groups", groupRoutes);
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Application Running on Port ${port}`));

createWebSocketServer(server); 
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});