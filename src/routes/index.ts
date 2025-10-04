import { Router } from "express";

import userRoutes from "./User.routes.ts";
import orderRoutes from "./Order.routes.ts";
import graphRoutes from "./Graph.routes.ts";

import authUser from "../middlewares/authUser.ts";

const routes = Router()

routes.use('/user', authUser, userRoutes)
routes.use('/order', authUser, orderRoutes)
routes.use('/graph', authUser, graphRoutes)

export default routes