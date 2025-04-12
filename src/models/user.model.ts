// src/models/user.model.ts
import mongoose, { Document, Schema , Types } from 'mongoose';



const userSchema: Schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// export default mongoose.model('User', userSchema);
export const User = mongoose.model('User', userSchema);