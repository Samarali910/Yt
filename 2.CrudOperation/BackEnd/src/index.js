import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})
import express from "express"
import cors from "cors"
import { ConnectDb } from "./connectdb/ConnectDb.js"
import userRouter from "./router/user.router.js"

  const app = express()
  const port = 4000
    
  app.use(express.json());
  app.use(cors({path:"http://localhost:5173/"}))

   app.use('/api/v1/user',userRouter)

ConnectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connect Error:", error.message);
    process.exit(1); // Server ko band kar do agar DB connect nahi hota
  });
    
