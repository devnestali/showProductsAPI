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
  async create(request: Request, response: Response): Promise<void> {
    const { title, description } = request.body
    let userId = request.cookies.userId
    
    if(!userId) {
      throw new Error('Usuário não autenticado.')
    }

    userId = Number(userId)
    
    if(!title) {
      throw new Error('Título deve ser preenchido.')
    }
    
    const formattedTitle = title.trim()
    const formattedDescription = description.trim()

    await prisma.order.create({
      data: {
        title: formattedTitle,
        description: formattedDescription,
        userId: userId
      }
    })

    response.status(201).json({ message: 'Pedido criado com sucesso.' })
  }
}

export default OrderController