import { Router } from "express"
import OrderController from "../controllers/OrderController.ts"

const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.get('/', orderController.show)

export default orderRoutes
