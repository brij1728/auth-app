import { NextFunction, Request, Response } from 'express';

import { User } from '../types';
import { prisma } from '../db';

interface CustomRequest extends Request {
  user?: User;
}

export const isOwner = async (
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
      include: { user: { include: { authentication: true } } },
    });

    if (!authRecord || !authRecord.user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid session token' });
    }

    req.user = authRecord.user;
    const resourceId = req.params.id;
    const userId = req.user.id.toString(); // Ensure the ID is a string

    console.log(
      `User ID from token: ${userId}, User ID from params: ${resourceId}`,
    );

    if (resourceId !== userId) {
      return res.status(403).json({
        message: 'Forbidden - You can only modify your own details',
      });
    }

    next();
  } catch (error) {
    console.error('Owner error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
