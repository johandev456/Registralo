import express from "express";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import autoRoute from "./routes/auto.route.js"
import userRoute from "./routes/user.route.js"
import assignRoute from "./routes/assignees.route.js"
import cors from "cors"

const app = express();
const port= process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL
}))

app.use("/api/auth",authRoute)
app.use("/api/auto",autoRoute)
app.use("/api/user",userRoute)
app.use("/api/assignees",assignRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${3000}`);
});