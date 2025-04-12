import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';




export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const authHeader = req.headers.authorization;
  console.log('Received Auth Header:', authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Invalid or missing token format');
    res.status(401).json({ message: 'No token provided or invalid format' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });

  // try {
  //   const decoded = jwt.verify(token, JWT_SECRET) as { id: string }; // Adjust according to your token payload
  //   req.user = { id: decoded.id }; // Attach user ID to request
  //   next();
  // } catch (err) {
  //   console.log('Token verification failed:', err);
  //   res.status(401).json({ message: 'Invalid or expired token' });
  //   return;
  // }
};