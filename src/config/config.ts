// src/config.ts
import 'dotenv/config';

// Validate critical ENV vars on startup
const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`❌ Missing ENV var: ${key}`);
    return value;
};

export default {
    PORT: getEnv('PORT'),
    JWT_SECRET: getEnv('JWT_SECRET'),
    MONGODB_URI: getEnv('MONGODB_URI') 
}; 