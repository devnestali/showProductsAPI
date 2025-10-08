import { Router } from "express";

import GraphController from "../controllers/GraphController.ts";

const graphRoutes = Router()
const graphController = new GraphController()

graphRoutes.get('/', graphController.show.bind(graphController))

export default graphRoutes