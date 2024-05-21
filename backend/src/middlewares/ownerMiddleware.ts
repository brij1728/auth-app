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
  try {
    const sessionToken = req.cookies['BRIJESH-AUTH'];
    if (!sessionToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No session token provided' });
    }

    const authRecord = await prisma.authRecord.findUnique({
      where: { sessionToken },
      include: { user: { include: { authentication: true } } },
    });

    if (!authRecord || !authRecord.user) {
      return res.status(401).json({
        message:
          'Unauthorized - Session token is invalid or user does not exist',
      });
    }

    req.user = authRecord.user;

    // Determining the type of resource and its ID
    const resourceId = req.params.id;
    const resourceType = req.baseUrl.includes('/users') ? 'user' : 'post';

    if (resourceType === 'post') {
      const post = await prisma.post.findUnique({
        where: { id: resourceId },
      });

      if (!post || post.ownerId !== req.user.id) {
        return res.status(403).json({
          message:
            'Forbidden - User is not the owner of the requested resource',
        });
      }
    } else if (resourceType === 'user') {
      if (resourceId !== req.user.id) {
        return res.status(403).json({
          message: 'Forbidden - User is not allowed to modify this user',
        });
      }
    }

    next();
  } catch (error) {
    console.error('Owner error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
