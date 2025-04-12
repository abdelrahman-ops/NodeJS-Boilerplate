import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await AuthService.register(username, email, password);
    
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    };
    
    res.status(201).json(userResponse);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    };
    res.json(userResponse);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
