import { Router } from "express";

import userRoutes from "./User.routes.js";
import orderRoutes from "./Order.routes.js";
import graphRoutes from "./Graph.routes.js";

import authUser from "../middlewares/authUser.js";
import sessionRoutes from "./Session.routes.js";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/order', authUser, orderRoutes)
routes.use('/graph', authUser, graphRoutes)
routes.use('/session', sessionRoutes)

export default routes