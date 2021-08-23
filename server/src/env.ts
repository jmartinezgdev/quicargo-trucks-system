// SERVER
export const SERVER_HOST: string = process.env.SERVER_HOST || 'localhost';
export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 3000;

// DATABASE
export const DATABASE: string = process.env.DATABASE || 'quicargo';
export const DATABASE_USER: string = process.env.DATABASE_USER || 'postgres';
export const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD || 'postgres';
export const DATABASE_PORT: number = Number(process.env.SERVER_PORT) || 5432;

// ENVIRONMENT 
export const NODE_ENV: string = process.env.NODE_ENV || 'development'

// API
export const API_VERSION: string = process.env.API_VERSION || 'v1';
export const API_PATH: string = process.env.API_PATH || `/api/${API_VERSION}`;
export const LOCATIONS_PATH: string = process.env.API_PATH || `${API_PATH}/locations`;
export const TRUCKS_PATH: string = process.env.API_PATH || `${API_PATH}/trucks`;
