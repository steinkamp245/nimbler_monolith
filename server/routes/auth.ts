import express from 'express';
import passport from 'passport';
import { authService, authMiddleware } from '../services/auth.service';
import _ from 'lodash';
import { IUser } from '../models/user';


const router = express.Router();


router.get('/sign-out', authMiddleware, (req, res) => {
    res.clearCookie('jwt-token');
    res.clearCookie('frontend-session');
    res.status(204).send();
});

router.get('/token-check', (req, res) => {
    const isAuthenticated = res.locals.user ? true : false;
    res.status(200).json({ isAuthenticated });
});



router.get('/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/google/redirect', passport.authenticate('google'), async (req, res) => {
    const token = await authService.createTokenForUser(req.user as IUser);
    res.cookie('jwt-token', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
    res.cookie('frontend-session', '', { expires: new Date(Date.now() + 86400000), httpOnly: false });
    res.redirect('http://localhost:4200/users/sign-in-redirect');
});



router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/redirect', passport.authenticate('facebook'), async (req, res) => {
    const token = await authService.createTokenForUser(req.user as IUser);
    res.cookie('jwt-token', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
    res.cookie('frontend-session', '', { expires: new Date(Date.now() + 86400000), httpOnly: false });
    res.redirect('http://localhost:4200/users/sign-in-redirect');
});



export default router;