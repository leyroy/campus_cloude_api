import express, { NextFunction, Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import { ErrorHandler } from "./libs/utils/errorHandler"


import cors from "cors"
import dotenv from "dotenv"
import specs from "./libs/swagger.config"
const app = express()
const PORT = process.env.PORT || 5000;

const errorHandler = new ErrorHandler()

//Middlware configuration
app.use(express.json());
app.use(cors())
dotenv.config();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Import routes
import appRouter from "./routes"

app.use("/campcloud/api/v1", appRouter);

app.get("/", async(req: Request, res: Response) => {
  res.json({message:"Welcome to the Express server!"});
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
