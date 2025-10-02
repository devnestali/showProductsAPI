import { Router } from "express"
import asyncHandler from 'express-async-handler'

import UserController from "../controllers/UserController.ts"

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', asyncHandler(userController.create.bind(userController)))
userRoutes.get('/', asyncHandler(userController.index.bind(userController)))

export default userRoutes
