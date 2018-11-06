import passport from 'passport';
import { User, IUser } from '../models/user';
import config from 'config';
import { Strategy as OAuth2Strategy } from 'passport-facebook';
export default function () {

    passport.use(
        new OAuth2Strategy({
            callbackURL: '/auth/facebook/redirect',
            clientID: config.get('facebookOauth.clientId') as string,
            clientSecret: config.get('facebookOauth.clientSecret') as string,
            profileFields: ['id', 'displayName', 'email']
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({ facebookId: profile.id })
                .then((user) => {
                    if (user) {
                        done(null, user);
                        // maybe detect changes and update the dataset in mongodb, like name, email eg
                    }
                    else {
                        const user = new User({
                            name: profile.displayName,
                            email: profile.emails![0].value,
                            facebookId: profile.id
                        }).save()
                            .then((newUser) => {
                                done(null, newUser);
                            })
                            .catch((err) => {
                                done(err, err);
                            });
                    }
                })
                .catch((err) => { done(err, err) })
        })
    );


    passport.serializeUser((user: IUser, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        User.findById(id)
            .then((user) => {
                if (user) done(null, user);
            })
    });
}
