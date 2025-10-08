import { Router } from "express";

import userRoutes from "./User.routes.ts";
import orderRoutes from "./Order.routes.ts";
import graphRoutes from "./Graph.routes.ts";

import authUser from "../middlewares/authUser.ts";
import sessionRoutes from "./Session.routes.ts";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/order', authUser, orderRoutes)
routes.use('/graph', authUser, graphRoutes)
routes.use('/session', sessionRoutes)

export default routes