import { Request, Response } from 'express';
import {
  generateSalt,
  generateToken,
  hashPassword,
  verifyPassword,
} from '../utils';

import { prisma } from '../db';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, authType } = req.body;
    if (!email || !password || !authType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { authentication: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const authRecord = user.authentication.find(
      auth => auth.authType === authType,
    );
    if (!authRecord) {
      return res
        .status(404)
        .json({ message: 'Authentication method not found' });
    }

    const { salt, password: hashedPassword } = authRecord;
    if (!(await verifyPassword(password, salt, hashedPassword))) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    const token = await generateToken();
    const sessionToken = await hashPassword(token, salt);
    await prisma.authRecord.update({
      where: { id: authRecord.id },
      data: { sessionToken },
    });

    res.cookie('BRIJESH-AUTH', sessionToken, {
      httpOnly: true,
      secure: true,
      domain: 'localhost',
      path: '/',
    });

    return res
      .status(200)
      .json({
        username: user.username,
        email: user.email,
      })
      .end();
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, authType } = req.body;
    console.log('Registering user:', username, email, authType);

    if (!username || !email || !password || !authType) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    const sessionToken = await generateToken();

    const user = await prisma.user.create({
      data: {
        username,
        email,
        authentication: {
          create: [
            {
              authType,
              password: hashedPassword,
              salt,
              sessionToken,
            },
          ],
        },
      },
    });

    console.log('User created successfully', user.id);
    return res.status(201).json({ user });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
