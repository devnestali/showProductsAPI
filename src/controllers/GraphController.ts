import type { Request, Response } from "express";

import { prisma } from "../prisma.ts";

import { orderArraySchema } from "./OrderController.ts";



class GraphController {
  async show(request: Request, response: Response): Promise<void> {
    const orders = await prisma.order.findMany()

    if(!orders || orders.length === 0) {
      throw new Error("Não foi possível encontrar os pedidos.")
    }

    const validOrders = orderArraySchema.parse(orders)

    if(!validOrders) {
      throw new Error("Modelo de dados de pedidos inválidos.")
    }

    let ordersByDate: Record<string, number> = {}

    validOrders.forEach((order) => {
      if (!order.orderDate) return

      const refactoredDate = order.orderDate.toISOString().split('T')[0]!!
      
      ordersByDate[refactoredDate] = (ordersByDate[refactoredDate] || 0) + 1
    })

    response.status(200).json(ordersByDate)
  }
}

export default GraphController