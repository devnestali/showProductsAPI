import { Router } from "express";

import userRoutes from "./User.routes.ts";
import orderRoutes from "./Order.routes.ts";
import graphRoutes from "./Graph.routes.ts";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/order', orderRoutes)
routes.use('/graph', graphRoutes)

export default routes