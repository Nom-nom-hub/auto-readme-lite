/**
 * TypeScript edge cases for auto-readme-lite.
 */

// Exported enum
export enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}

// Exported type
export type Point = { x: number; y: number };

// Exported default function
export default function defaultTsFunc(): string {
  return 'I am a TS default export!';
}

// Exported function with rest and destructured params
export function complexParams({a, b}: {a: number, b: number}, ...args: string[]): [number, number, string[]] {
  return [a, b, args];
} 