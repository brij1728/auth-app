import { NextFunction, Request, Response } from 'express';

import { User } from '../types';
import { prisma } from '../db';

interface CustomRequest extends Request {
  user?: User;
}

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const sessionToken = req.cookies['BRIJESH-AUTH'];
  if (!sessionToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - No session token provided' });
  }

  try {
    const authRecord = await prisma.authRecord.findUnique({
      where: { sessionToken },
      include: {
        user: {
          include: { authentication: true },
        },
      },
    });

    if (!authRecord || !authRecord.user) {
      return res.status(401).json({
        message: 'Unauthorized - Session not valid or user not found',
      });
    }

    req.user = authRecord.user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
