import express from "express";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)


app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});