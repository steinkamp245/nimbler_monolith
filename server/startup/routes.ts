import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from 'passport';
import auth from '../routes/auth';
import users from '../routes/users';
import events from '../routes/events';
import error from '../services/error';
import { jwtClaimSetMiddleware, authMiddleware } from '../services/auth.service';
import cors from '../services/cors';


export default function (app: express.Application) {

    app.use(cors);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(jwtClaimSetMiddleware);
    app.use(helmet());
    app.use(passport.initialize());


    app.use('/auth', auth);
    app.use('/api/users', authMiddleware, users);
    app.use('/api/events', authMiddleware, events);
    app.use(error);
}