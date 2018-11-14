import express from 'express';
import _ from 'lodash';
import { validatePutCategoriesReqBody, validatePutLatestStartTimeReqBody, User } from '../models/user';

const router = express.Router();

router.get('/eventConfig', async (req, res) => {
    console.log(res.locals.user.userId);
    const user = await User.findById(res.locals.user.userId);

    if (!user) return res.status(404).json({ message: 'An user with the given id was not found' });
    res.send(_.pick(user, ['eventConfig']));
});

router.put('/eventConfig/categories', async (req, res) => {
    const { error } = validatePutCategoriesReqBody(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findById(res.locals.user.userId);
    if (!user) return res.status(404).json({ message: 'An user with the given id was not found' });

    try {
        user.eventConfig.categories = req.body.categories;
        await user.save();
        res.status(200).send(_.pick(user, ['eventConfig.categories']));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/eventConfig/latestStartTime', async (req, res) => {
    const { error } = validatePutLatestStartTimeReqBody(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findById(res.locals.user.userId);
    if (!user) return res.status(404).json({ message: 'An user with the given id was not found' });

    try {
        user.eventConfig.latestStartTime = req.body.latestStartTime;
        await user.save();
        res.status(200).send(_.pick(user, ['eventConfig.latestStartTime']));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});



export default router;