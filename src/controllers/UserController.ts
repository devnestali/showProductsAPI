import type { Request, Response } from "express";
import bcrypt from "bcrypt"

import { prisma } from "../prisma.ts";

class UserController {
  async create(request: Request, response: Response): Promise<Response | undefined> {
    const { username, email, password } = request.body

    const emptyFields = !username || !email || !password

    if(emptyFields) {
      return response.status(400).json({ message: 'Preencha todos os campos.' })
    }

    const emailAlreadyExists = await prisma.user.findUnique({ where: { email } })

    if (emailAlreadyExists) {
      return response.status(409).json({ message: 'O e-mail já existe.' })
    }

    const usernameAlreadyExists = await prisma.user.findUnique({ where: { username } })

    if (usernameAlreadyExists) {
      return response.status(409).json({ message: 'Já existe um usuário com esse nome.' })
    }

    const formattedUsername = username.trim()
    const formattedEmail = email.trim()
    const hashedPassword = bcrypt.hashSync(password, 8)

    const user = await prisma.user.create({
      data: {
        username: formattedUsername,
        email: formattedEmail,
        password: hashedPassword,
      }
    })

    response.cookie("userId", user.id, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60  * 60 * 1000, // 1 day in ms
      sameSite: "strict"
    })

    return response.status(201).json({
      message: 'Usuário registrado com sucesso.',
    })
  }

  async index(request: Request, response: Response): Promise<Response | undefined> {
    const userIdStr = request.query.userId

    if(!userIdStr) {
      return response.status(401).json({ message: 'Usuário não autenticado.' })
    }

    const userId = Number(userIdStr)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId
      }
    })

    return response.status(200).json(user)
  }
}

export default UserController