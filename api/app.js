import express from "express";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
const app = express();
const port= process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${3000}`);
});