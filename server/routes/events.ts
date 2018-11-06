import express from 'express';
import _ from 'lodash';
import validateObjectId from '../services/validateObjectId';
import { Event, validatePostPutReqBody } from '../models/event';


const router = express.Router();

router.get('/', async (req, res) => {
    const events = await Event
        .find()
        .populate('createdBy', '-__v -googleId -email')
        .populate('participants', '-__v -googleId -email');

    res.send(events.map((event) => _.pick(event,
        ['_id', 'createdBy', 'participants', 'title', 'description', 'availablePlaces', 'location', 'genre', 'startDate', 'endDate']
    )));
});

router.get('/:id', validateObjectId, async (req, res) => {
    const event = await Event
        .findById(req.params.id)
        .populate('createdBy', '-__v -googleId -email')
        .populate('participants', '-__v -googleId -email');

    if (!event) return res.status(404).json({ message: 'An event with the given id was not found' });
    res.send(_.pick(event,
        ['_id', 'createdBy', 'participants', 'title', 'description', 'availablePlaces', 'location', 'genre', 'startDate', 'endDate']));
});

router.post('/', async (req, res) => {
    const { error } = validatePostPutReqBody(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const event = new Event({ createdBy: res.locals.user.userId, ...req.body });
    await event.save();
    res.status(201).json(_.pick(event,
        ['_id', 'createdBy', 'participants', 'title', 'description', 'availablePlaces', 'location', 'genre', 'startDate', 'endDate']));
});

router.put('/:id', validateObjectId, async (req, res) => {
    const { error } = validatePostPutReqBody(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'An event with the given id was not found' });
    if (event.createdBy != res.locals.user.userId) return res.status(403).json({ message: 'You are not authorized to update this event' });

    event.set(req.body);
    event.save();
    res.status(200).send(_.pick(event,
        ['_id', 'createdBy', 'participants', 'title', 'description', 'availablePlaces', 'location', 'genre', 'startDate', 'endDate']));
});

router.patch('/join/:id', validateObjectId, async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'An event with the given id was not found' });

    if (event.participants.length === event.availablePlaces) return res.status(400).json({ message: 'The event is already full' });
    if (event.createdBy == res.locals.user.userId) return res.status(403).json({ message: 'You can not join your own event' });

    const alreadyParticipating = event.participants.some(eventId => eventId == res.locals.user.userId);
    if (alreadyParticipating) return res.status(403).json({ message: 'You already participate at this event' });

    event.participants.push(res.locals.user.userId);
    await event.save();
    res.status(204).send();
});

router.patch('/leave/:id', validateObjectId, async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'An event with the given id was not found' });

    const index = event.participants.findIndex(userId => userId == res.locals.user.userId);
    if (index === -1) return res.status(404).json({ message: 'You are not participating in this event' });
    event.participants.splice(index, 1);
    await event.save();

    res.status(204).send();
});

router.delete('/:id', validateObjectId, async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'An event with the given id was not found' });

    if (event.createdBy != res.locals.user.userId) return res.status(403).json({ message: 'You are not authorized to delete this event' });
    await event.remove();
    res.status(204).send();
});

export default router;