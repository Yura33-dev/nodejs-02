import dotenv from 'dotenv';

dotenv.config();

export const env = (variableName: string, defaultValue: string) => {
  const value = process.env[variableName];

  if (value) return value;

  if (defaultValue && defaultValue.length > 0) return defaultValue;

  throw new Error(`Missing: process.env['${variableName}'].`);
};
