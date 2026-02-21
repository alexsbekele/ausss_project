import type { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[error_handler]', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
};
