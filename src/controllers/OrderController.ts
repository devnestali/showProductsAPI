import { z } from 'zod'
import type { Request, Response } from 'express'

import { prisma } from '../prisma.ts'

const ordersSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  orderDate: z.date(),
  userId: z.number()
})




class OrderController {
  async create(request: Request, response: Response) {
    try {
      const { title, description } = request.body

      if(!title || !description) {
        return new Error('Título e descrição devem ser preenchidos.')
      }
      // preciso fazer o controller do usuario para continuar

      const formattedTitle = title.trim()
      const formattedDescription = description.trim()



    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar pedido.' })
    }
  }
  
  async show(request: Request, response: Response) {
    try {
      const orders = await prisma.order.findMany()
      
      const validatedOrders = ordersSchema.parse(orders)
      
      return response.status(200).json(validatedOrders)
    } catch (error) { 
      return response.status(500).json({ message: 'Erro ao buscar pedidos.' })
    }
  }
}

export default OrderController