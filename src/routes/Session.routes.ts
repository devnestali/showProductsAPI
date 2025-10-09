import { Router } from "express";
import SessionController from "../controllers/SessionController.js";

const sessionRoutes = Router()
const sessionController = new SessionController()

sessionRoutes.post('/', sessionController.create.bind(sessionController))

export default sessionRoutes