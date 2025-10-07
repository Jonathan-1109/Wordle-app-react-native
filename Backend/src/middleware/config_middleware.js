import {json} from "express";
import cors from "cors";
import morgan from "morgan"

const appConfig = (app) => {
  app.use(cors())
  app.use(json())
  app.use(morgan("dev"));
}

export default appConfig
