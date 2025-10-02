import type { Request, Response } from "express";
import bcrypt from "bcrypt"

import { prisma } from "../prisma.ts";

class UserController {
  async create(request: Request, response: Response): Promise<void> {
    const { username, email, password, isAdmin } = request.body

    if(!isAdmin) {
      throw new Error("Somente administradores podem acessar essa página.")
    }

    const emptyFields = !username || !email || !password

    if(emptyFields) {
      throw new Error("Preencha todos os campos antes de entrar")
    }

    const emailAlreadyExists = await prisma.user.findUnique({ where: { email } })

    if (emailAlreadyExists) {
      throw new Error("O e-mail já existe.")
    }

    const usernameAlreadyExists = await prisma.user.findUnique({ where: { username } })

    if (usernameAlreadyExists) {
      throw new Error("Já existe um usuário com esse nome.")
    }

    const formattedUsername = username.trim()
    const formattedEmail = email.trim()
    const hashedPassword = bcrypt.hashSync(password, 8)

    const user = await prisma.user.create({
      data: {
        username: formattedUsername,
        email: formattedEmail,
        password: hashedPassword,
        isAdmin
      }
    })

    response.cookie("userId", user.id, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60  * 60 * 1000, // 1 day in ms
      sameSite: "strict"
    })

    response.status(201).json({
      message: 'Usuário registrado com sucesso.',
    })

  }
}

export default UserController