import { Router } from "express"
import OrderController from "../controllers/OrderController.ts"
import asyncHandler from 'express-async-handler'

const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.post('/', asyncHandler(orderController.create.bind(orderController)))
orderRoutes.get('/', asyncHandler(orderController.show.bind(orderController)))


export default orderRoutes
