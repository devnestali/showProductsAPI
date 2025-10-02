import { Router } from "express";
import asyncHandler from 'express-async-handler'

import GraphController from "../controllers/GraphController.ts";

const graphRoutes = Router()
const graphController = new GraphController()

graphRoutes.get('/', asyncHandler(graphController.show.bind(graphController)))

export default graphRoutes