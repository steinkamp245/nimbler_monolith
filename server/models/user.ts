import mongoose from 'mongoose';


export interface IUser extends mongoose.Document {
    name: string
    email: string
    googleId?: string
    facebookId?: string
};


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String
    }
});

export const User = mongoose.model<IUser>('User', userSchema);