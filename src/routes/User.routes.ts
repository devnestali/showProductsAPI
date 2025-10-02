import { Router } from "express"
import UserController from "../controllers/UserController.ts"

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create)

export default userRoutes
