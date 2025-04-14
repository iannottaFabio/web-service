import express from "express";
import router from "./routes/PasswdRoute.js"
import SecureRouter from "./routes/secureRoute.js";

const app = express()
app.use(express.json());

app.use('/password', router)

app.use('/secure', SecureRouter)

app.listen(8080, () => {
    console.log("http://localhost:8080")
})

