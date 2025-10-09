import type { Request, Response } from "express";

import { prisma } from "../prisma.js";

import { orderArraySchema } from "./OrderController.js";



class GraphController {
  async show(request: Request, response: Response): Promise<Response | undefined> {
    const orders = await prisma.order.findMany()

    if(!orders || orders.length === 0) {
      return response.status(404).json({ message: 'Nenhum pedido encontrado.'})
    }

    const validOrders = orderArraySchema.parse(orders)

    if(!validOrders) {
      return response.status(409).json({ message: 'Modelo de dados de pedidos inválidos.' })
    }

    let ordersByDate: Record<string, number> = {}

    validOrders.forEach((order) => {
      if (!order.orderDate) return

      const refactoredDate = order.orderDate.toISOString().split('T')[0]!!
      
      ordersByDate[refactoredDate] = (ordersByDate[refactoredDate] || 0) + 1
    })

    return response.status(200).json(ordersByDate)
  }
}

export default GraphController