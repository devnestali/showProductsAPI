import { z } from 'zod'
import type { Request, Response } from 'express'

import { prisma } from '../prisma.ts'

const orderSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  orderDate: z.date(),
  userId: z.number()
})

const orderArraySchema = z.array(orderSchema)

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

  async show(request: Request, response: Response): Promise<void> {
    const order = await prisma.order.findMany()

    if(!order) {
      throw new Error("Não foi possível encontrar os pedidos.")
    }

    const validOrder = orderArraySchema.parse(order)

    if(!validOrder) {
      throw new Error("Modelo de dados do pedido inválido.")
    }

    response.status(200).json(validOrder)
  }

  async index(request: Request, response: Response): Promise<void> {
    let { orderId } = request.params

    if(!orderId) {
      throw new Error("Numero do pedido não informado.")
    }

    const orderIdInTypeNumber = Number(orderId)

    const order = await prisma.order.findUnique({
      where: {
        id: orderIdInTypeNumber
      }
    })

    if(!order) {
      throw new Error("Pedido não encontrado.")
    }

    response.status(200).json(order)
  }
}

export default OrderController