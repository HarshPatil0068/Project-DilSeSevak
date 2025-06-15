import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"


dotenv.config();
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes)

app.get("/", (req, res)=> res.send("API is running......"))


const PORT = process.env.PORT;
app.listen(PORT, ()=>{ console.log(`Server running on port ${PORT}`); })