import { Router } from "express"
import OrderController from "../controllers/OrderController.ts"

const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.post('/', orderController.create.bind(orderController))
orderRoutes.get('/', orderController.show.bind(orderController))
orderRoutes.get('/:orderId', orderController.index.bind(orderController))
orderRoutes.delete('/:orderId', orderController.delete.bind(orderController))
orderRoutes.put('/:orderId', orderController.update.bind(orderController))


export default orderRoutes
