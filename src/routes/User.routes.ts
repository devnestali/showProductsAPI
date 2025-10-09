import { Router } from "express"

import UserController from "../controllers/UserController.js"

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', userController.create.bind(userController))
userRoutes.get('/', userController.index.bind(userController))

export default userRoutes
