import mongoose from 'mongoose';
import * as Joi from 'joi';

interface EventConfig {
    categories: string[]
    latestStartTime: number
}

export interface IUser extends mongoose.Document {
    name: string
    email: string
    googleId?: string
    facebookId?: string
    eventConfig: EventConfig
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
    },
    eventConfig: {
        categories: {
            type: [{
                type: String,
                enum: ['Sport', 'Chill', 'Party', 'Education', 'Other'],
                trim: true
            }],
            default: ['Chill']
        },

        latestStartTime: {
            type: Number,
            min: 1,
            max: 24,
            default: 6
        }
    }
});


export function validatePutCategoriesReqBody(reqBody: string[]) {
    const schema = {
        categories: Joi.array().items(Joi.string().valid('Sport', 'Chill', 'Party', 'Education', 'Other')).required()
    }
    return Joi.validate(reqBody, schema);
}

export function validatePutLatestStartTimeReqBody(reqBody: number) {
    const schema = {
        latestStartTime: Joi.number().min(1).max(24).required()
    }
    return Joi.validate(reqBody, schema);
}

export const User = mongoose.model<IUser>('User', userSchema);