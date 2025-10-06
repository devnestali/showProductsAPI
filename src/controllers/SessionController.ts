import { compare } from 'bcrypt';
import pkg, { type SignOptions } from 'jsonwebtoken'
import type { Request, Response } from 'express'

import { prisma } from '../prisma.ts';
import auth from '../config/auth.ts';

class SessionController {
  async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body
    const { secret, expiresIn }: { secret: string, expiresIn: number } = auth.jwt
    const { sign } = pkg

    const emptyFields = !email || !password

    if (emptyFields) throw new Error('Todos os campos devem ser preenchidos.')

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(!user) throw new Error('Email e/ou senha incorretos.')

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) throw new Error('Email e/ou senha incorretos.')

    const options: SignOptions = {
      subject: String(user.id),
      expiresIn: expiresIn
    }

    const token = sign({}, secret, options)

    const authenticatedUser = {
      user: {
        ...user
      },
      token
    }

    response.status(200).json(authenticatedUser)
  }
}

export default SessionController

/**
  Próximos passos para a realização do projeto: 

  - Testar a criacao do sessionController e o sessionRoutes
  - Testar tudo no Postman e adicionar o token no header da requisição 
  para poder executar o middleware de autenticação
 */