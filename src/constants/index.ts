import path from 'path';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export enum SMTP {
  HOST = 'SMTP_HOST',
  PORT = 'SMTP_PORT',
  USER = 'SMTP_USER',
  PASSWORD = 'SMTP_PASSWORD',
  FROM = 'SMTP_FROM',
}

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export enum CLOUDINARY {
  CLOUD_NAME = 'CLOUD_NAME',
  API_KEY = 'API_KEY',
  API_SECRET = 'API_SECRET',
}

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
