import mongoose from 'mongoose';
import * as Joi from 'joi';


export interface IEvent extends mongoose.Document {
    createdBy: mongoose.Types.ObjectId
    participants: mongoose.Types.ObjectId[]
    title: string
    description: string
    availablePlaces: number
    location: string
    genre: 'Sport' | 'Chill' | 'Party' | 'Education' | 'Other'
    startDate: Date
    endDate: Date
}

export function validatePostPutReqBody(reqBody: Partial<IEvent>) {
    const schema = {
        participants: Joi.array().items(Joi.string()).required(),
        title: Joi.string().max(25).required(),
        description: Joi.string().max(255).required(),
        availablePlaces: Joi.number().integer().min(1).max(255).required(),
        location: Joi.string().required(),
        genre: Joi.string().valid('Sport', 'Chill', 'Party', 'Education', 'Other').required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required()
    }
    return Joi.validate(reqBody, schema);
}

export let EventSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    title: {
        type: String,
        max: 25,
        required: true
    },
    description: {
        type: String,
        max: 255,
        required: true
    },
    availablePlaces: {
        type: Number,
        min: 1,
        max: 255,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);