/**
 * TypeScript interfaces and types for testing.
 */

/**
 * User interface for testing TypeScript support.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

/**
 * Configuration interface.
 */
export interface Config {
  port: number;
  host: string;
  debug: boolean;
  timeout: number;
}

/**
 * API response interface.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

/**
 * Creates a new user.
 * @param name - User's name
 * @param email - User's email
 * @param age - User's age (optional)
 * @returns Promise<User> - Created user
 */
export async function createUser(name: string, email: string, age?: number): Promise<User> {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    age
  };
}

/**
 * Validates user data.
 * @param user - User object to validate
 * @returns boolean - True if valid
 */
export function validateUser(user: User): boolean {
  return !!(user.name && user.email);
}

/**
 * Default configuration.
 */
export const defaultConfig: Config = {
  port: 3000,
  host: 'localhost',
  debug: false,
  timeout: 5000
};

// Export types
export type UserId = string;
export type Email = string; 