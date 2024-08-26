import { compare, hash } from 'bcrypt';

export interface User {
  id: string;
  username: string;
  password: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function createUser(username: string, password: string): User {
  const id = Math.random().toString(36).substr(2, 9);
  return { id, username, password };
}
