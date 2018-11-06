import express from 'express';
import logging from './startup/logging';
import db from './startup/db';
import passportGoogleSetup from './services/passport-google-setup';
import passportFacebookSetup from './services/passport-facebook-setup';
import config from './startup/config';
import routes from './startup/routes';


const app = express();

config(app);
passportGoogleSetup();
passportFacebookSetup();
logging(app);
db();
routes(app);



const PORT = process.env.NODE_ENV === 'test' ? 0 : (process.env.PORT || 3000) ;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = server;

