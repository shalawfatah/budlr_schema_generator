import express from "express"
import cors from "cors"
import 'dotenv/config'
import routes from "./routes/locationRoutes.js";
import { cors_options } from "./utils/cors_options.js";


const app = express()
app.use(cors(cors_options))

const PORT = process.env.PORT || 3030

app.use("/", routes)

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT " + PORT)
})
