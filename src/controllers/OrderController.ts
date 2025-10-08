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

export const orderArraySchema = z.array(orderSchema)

class OrderController {
  async create(request: Request, response: Response): Promise<Response | void> {
    const { title, description } = request.body
    let userId = request.cookies.userId
    
    if(!userId) {
      return response.status(401).json({ message: 'Usuário não autenticado.' })
    }

    userId = Number(userId)
    
    if(!title) {
      return response.status(400).json({ message: 'Título deve ser preenchido.' })
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

    return response.status(201).json({ message: 'Pedido criado com sucesso.' })
  }

  async show(request: Request, response: Response): Promise<Response | undefined> {
    const order = await prisma.order.findMany()

    if(!order) {
      return response.status(404).json({ message: 'Não foi possível encontrar os pedidos.' })
    }

    const validOrder = orderArraySchema.parse(order)

    if(!validOrder) {
      return response.status(422).json({ message: 'Modelo de dados do pedido inválido.' })
    }

    return response.status(200).json(validOrder)
  }

  async index(request: Request, response: Response): Promise<Response | undefined> {
    let { orderId } = request.params

    if(!orderId) {
      return response.status(400).json({ message: 'Numero do pedido não informado.' })
    }

    const orderIdInTypeNumber = Number(orderId)

    const order = await prisma.order.findUnique({
      where: {
        id: orderIdInTypeNumber
      }
    })

    if(!order) {
      return response.status(404).json({ message: 'Pedido não encontrado.' })
    }

    return response.status(200).json(order)
  }

  async delete(request: Request, response: Response): Promise<Response | undefined> {
    let { orderId } = request.params

    if (!orderId) {
      return response.status(400).json({ message: 'Numero de pedido não informado.' })
    }

    const orderIdInTypeNumber = Number(orderId)

    await prisma.order.delete({
      where: {
        id: orderIdInTypeNumber
      }
    })

    return response.status(202).json({ message: "Pedido excluido com sucesso." })
  }

  async update(request: Request, response: Response): Promise<Response | undefined> {
    const { newTitle, newDescription } = request.body
    let { orderId } = request.params

    if(!newTitle) {
      return response.status(400).json({ message: 'O título não pode estar vazio.' })
    }

    if(!orderId) {
      return response.status(400).json({ message: 'Numero de pedido não informado.' })
    }

    const formattedTitle = newTitle.trim()
    const formattedDescription = newDescription.trim()
    const orderIdInTypeNumber = Number(orderId)

    await prisma.order.update({
      where: {
        id: orderIdInTypeNumber
      },
      data: {
        title: formattedTitle,
        description: formattedDescription,
        orderDate: new Date()
      }
    })

    return response.status(200).json({
      message: 'Pedido atualizado com sucesso.'
    })
  }
}

export default OrderController