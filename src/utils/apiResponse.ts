// src/utils/apiResponse.ts
import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    data
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 400,
  error?: any
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined
  });
};