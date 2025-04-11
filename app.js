import express from "express";
import router from "./routes/PasswdRoute.js"

const app = express()
app.use(express.json());

app.use('/password', router)

app.listen(8080, () => {
    console.log("http://localhost:8080")
})

