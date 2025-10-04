import { verify } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import auth from '../config/auth.ts'

function authUser(request: Request, response: Response, next: NextFunction) {
  const authHeader: string | undefined = request.headers.authorization

  if (!authHeader) {
    throw new Error('token não encontrado.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token!, auth.jwt.secret)
    
    if(user_id) {
      next()
    }

  } catch (error) {
    throw new Error('Token Inválido.')
  }
}

export default authUser