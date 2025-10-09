import { compare } from 'bcrypt';
import pkg, { type SignOptions } from 'jsonwebtoken'
import type { Request, Response } from 'express'

import { prisma } from '../prisma.js';
import auth from '../config/auth.js';

class SessionController {
  async create(request: Request, response: Response): Promise<Response | undefined> {
    const { email, password } = request.body
    const { secret, expiresIn }: { secret: string, expiresIn: number } = auth.jwt
    const { sign } = pkg

    const emptyFields = !email || !password

    if (emptyFields) {
      return response.status(400).json({ message: 'Todos os campos devem ser preenchidos.' })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(!user) {
      return response.status(401).json({ message: 'Email e/ou senha incorretos.' })
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      return response.status(401).json({ message: 'Email e/ou senha incorretos.' })
    }

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

    return response.status(200).json(authenticatedUser)
  }
}

export default SessionController