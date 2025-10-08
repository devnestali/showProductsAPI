import pkg from 'jsonwebtoken'

import type { Request, Response, NextFunction } from 'express'

import auth from '../config/auth.ts'

function authUser(request: Request, response: Response, next: NextFunction) {
  const authHeader: string | undefined = request.headers.authorization
  const { verify } = pkg

  if (!authHeader) {
    return response.status(401).json({ message: 'token não encontrado.' })
  }


  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token!, auth.jwt.secret)
    
    if(user_id) {
      next()
    }

  } catch (error) {
    return response.status(401).json({ message: 'Token Inválido.' })
  }
}

export default authUser