import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.send(`Hello Users from controller`);
};
