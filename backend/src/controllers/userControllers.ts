import { Request, Response } from 'express';

import { ObjectId } from 'mongodb';
import { Prisma } from '@prisma/client';
import { prisma } from '../db';

export const getAllUsers = async (req: Request, res: Response) => {
  console.log('Get all users');
  try {
    const { limit, skip, sort } = req.query;

    const queryOptions = {
      take: limit ? parseInt(limit as string, 10) : undefined,
      skip: skip ? parseInt(skip as string, 10) : undefined,
      orderBy: sort
        ? {
            username: sort as 'asc' | 'desc',
          }
        : undefined,
    };

    const users = await prisma.user.findMany({
      ...queryOptions,
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return res.status(200).json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  // Check for existing user with the same email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'A user with this email already exists.' });
  }

  try {
    const newUser = await prisma.user.create({
      data: { username, email },
    });
    return res.status(201).json({ newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Create user error:', error.message);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('Received ID:', id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    // Handling specific errors such as a Prisma Client known error for not found
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    console.log('Received ID:', id);
    console.log('Received username:', username);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    if (!username || !email) {
      return res
        .status(400)
        .json({ message: 'Username and email are required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email },
    });

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
