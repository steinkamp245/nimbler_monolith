import mongoose from 'mongoose';
import config from 'config';
import bluebird from 'bluebird';



export default function () {
    const Fawn = require('fawn');
    const url = config.get('mongoHost') as String;
    mongoose.Promise = bluebird;
    mongoose.connect(`mongodb://${url}:27017/nimbler`, { useNewUrlParser: true })
        .then(() => {
            Fawn.init(mongoose);
            console.log(`Connected to mongodb://${url}:27017/nimbler...`);
        });
}