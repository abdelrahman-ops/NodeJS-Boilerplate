// src/server.ts
import app from './app';
// import dotenv from 'dotenv';
import connectDB from './config/db';
import config from "./config/config";
// dotenv.config();
connectDB();

const PORT = config.PORT || 5050;

app.listen(config.PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
