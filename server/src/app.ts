import express, { Request, Response, NextFunction } from "express"
import {config} from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import appRouter from "./routes"; 
import cors from "cors"
import path from "path"

config()

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

// CORS options
const corsOptions = {
  origin: FRONTEND_URL, // Allow requests from this origin
  credentials: true, // Enable cookies to be sent and received
  optionsSuccessStatus: 200, // For older browsers
};

// middlewares
app.use(cors(corsOptions));

app.use((req: Request , res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL!);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Combine headers
  next();
});

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET));
// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "../client/build")));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter)


const filePath = path.join(__dirname, 'client', 'build', 'index.html');
console.log(filePath)

export default app