import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Demasiados intentos, inténtalo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
