import express, { Application } from "express";   // import Express với type
import bodyParser from "body-parser";            // nạp body-parser
import viewEngine from "./config/viewEngine";    // config view EJS
import initWebRoutes from "./route/web";         // file route
import connectDB from "./config/configdb";       // kết nối DB
import dotenv from "dotenv";                     // đọc file .env

dotenv.config();

const app: Application = express();  // định nghĩa kiểu cho app

// Config app
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view + route
viewEngine(app);
initWebRoutes(app);

// Kết nối DB
connectDB();

// Set port từ .env hoặc mặc định 6969
const port: number = Number(process.env.PORT) || 6969;

// Chạy server
app.listen(port, () => {
  console.log(`Backend Nodejs is running on the port: ${port}`);
});