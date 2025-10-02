import { Router } from "express";

import userRoutes from "./User.routes.ts";
import orderRoutes from "./Order.routes.ts";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/order', orderRoutes)

export default routes