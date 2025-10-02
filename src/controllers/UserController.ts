import type { Request, Response } from "express";
import bcrypt from "bcrypt"

import { prisma } from "../prisma.ts";

class UserController {
  async create(request: Request, response: Response) {
    const { username, email, password, isAdmin } = request.body

    if(!isAdmin) {
      return new Error("Somente administradores podem acessar essa página.")
    }

    const emptyFields = !username || !email || !password

    if(emptyFields) {
      return new Error("Preencha todos os campos antes de entrar")
    }

    const emailAlreadyExists = await prisma.user.findUnique({ where: { email } })

    if (emailAlreadyExists) {
      return new Error("O e-mail já existe.")
    }

    const usernameAlreadyExists = await prisma.user.findUnique({ where: { username } })

    if (usernameAlreadyExists) {
      return new Error("Já existe um usuário com esse nome.")
    }

    const formattedUsername = username.trim()
    const formattedEmail = email.trim()
    const hashedPassword = bcrypt.hashSync(password, 8)

    await prisma.user.create({
      data: {
        username: formattedUsername,
        email: formattedEmail,
        password: hashedPassword,
        isAdmin
      }
    })

    return response.status(200).json({
      message: 'Usuário registrado com sucesso.'
    })

  }
}

export default UserController