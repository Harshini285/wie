import { Request, Response } from 'express';
import Admin from '../models/adminModel';

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
