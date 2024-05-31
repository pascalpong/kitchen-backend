import { randomBytes } from 'crypto';

export const generateKey = async () => {
  const secretKey = randomBytes(12).toString('hex');
  return secretKey;
}