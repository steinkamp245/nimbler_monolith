import mongoose from 'mongoose';
import { Server } from 'http';
import request from 'supertest';
import { User, IUser } from '../../models/user';
import { authService } from '../../services/auth.service';
import { Event, IEvent } from '../../models/event';

describe('/api/events', () => {
    let server: Server;
    let token: string;
    let user: IUser;

    beforeEach(async () => {
        server = require('../../app');
        user = new User({
            name: 'John Doh',
            email: 'john@doh.com',
            googleId: '1234ExampleId'
        });
        token = await authService.createTokenForUser(user);
        token = `jwt-token=${token}`;
    });

    afterEach(async () => {
        await Event.deleteMany({});
        server.close();
    });



    describe('GET /', () => {
        let exec = () => {
            return request(server)
                .get('/api/events')
                .set('cookie', token);
        };

        it('should return status 401 when no valid jwt-token', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return an array of events', async () => {
            await Event.insertMany([
                {
                    createdBy: mongoose.Types.ObjectId(),
                    participants: [], title: 'My example event',
                    description: 'example description',
                    availablePlaces: 4,
                    location: "gps daten",
                    genre: 'Party',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);

            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.some((events: IEvent) =>
                Array.isArray(events.participants) &&
                events.availablePlaces === 4 &&
                typeof events.title === 'string' &&
                typeof events.description === 'string' &&
                typeof events.location === 'string' &&
                events.genre === 'Party' &&
                events.startDate instanceof Date &&
                events.endDate instanceof Date));
        });
    });



    describe('GET /:id', () => {
        it('should return status 400 if the ReqParam is not a valid ObjectId', async () => {
            const res = await request(server)
                .get('/api/events/wronId123')
                .set('cookie', token);

            expect(res.status).toBe(400);
        });

        it('should return 404 if no event with the given id was found', async () => {
            const res = await request(server)
                .get(`/api/events/${mongoose.Types.ObjectId()}`)
                .set('cookie', token);

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/event with the given id/);
        });

        it('should return the a specific event', async () => {
            const events = await Event.insertMany([
                {
                    createdBy: mongoose.Types.ObjectId(),
                    participants: [], title: 'My example event',
                    description: 'example description',
                    availablePlaces: 4,
                    location: "gps daten",
                    genre: 'Party',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);

            const res = await request(server)
                .get(`/api/events/${events[0].id}`)
                .set('cookie', token);

            expect(res.status).toBe(200);
            expect(res.body._id).toBe(events[0].id);
        });
    });



    describe('POST /', () => {
        let participants: mongoose.Types.ObjectId[] | string | undefined;
        let availablePlaces: number | undefined;
        let title: string | undefined;
        let description: string | undefined;
        let location: string | undefined;
        let genre: string | undefined;
        let startDate: Date | undefined;
        let endDate: Date | undefined;

        let exec = () => {
            return request(server)
                .post('/api/events')
                .send({ participants, title, description, availablePlaces, location, genre, startDate, endDate })
                .set('cookie', token);
        };

        beforeEach(async () => {
            participants = [];
            title = 'My example title';
            description = 'Example description';
            availablePlaces = 4;
            location = 'random location';
            genre = 'Sport';
            startDate = new Date(2018, 0, 1, 15);
            endDate = new Date(2018, 0, 1, 18);
        });

        it('should return status 400 if the req.body is missing participants', async () => {
            participants = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/participants/);
        });

        it('should return status 400 if the req.body is missing a title', async () => {
            title = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/title/);
        });

        it('should return status 400 if the req.body is missing a description', async () => {
            description = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/description/);
        });

        it('should return status 400 if the req.body is missing availablePlaces', async () => {
            availablePlaces = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/availablePlaces/);
        });

        it('should return status 400 if the availablePlaces is smaller 1', async () => {
            availablePlaces = 0;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/larger than or equal to 1/);
        });

        it('should return status 400 if the availablePlaces is greater than 255', async () => {
            availablePlaces = 256;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/less than or equal to 255/);
        });

        it('should return status 400 if the req.body is missing the location', async () => {
            location = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/location/);
        });

        it('should return status 400 if the req.body is missing a genre', async () => {
            genre = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/genre/);
        });

        it('should return status 400 if the genre is not valid', async () => {
            genre = 'Unbekanntes Genre';
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/genre/);
        });

        it('should return status 400 if the req.body is missing a startDate', async () => {
            startDate = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/startDate/);
        });

        it('should return status 400 if the req.body is missing a endDate', async () => {
            endDate = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/endDate/);
        });

        it('should return status 201 when successfully created', async () => {
            const res = await exec();
            expect(res.status).toBe(201);
        });

        it('should return the created event when successfully', async () => {
            const res = await exec();

            expect(res.body._id).toBeTruthy();
            expect(res.body.createdBy instanceof mongoose.Types.ObjectId);
            expect(Array.isArray(res.body.participants)).toBeTruthy();
            expect(typeof res.body.title === 'string').toBeTruthy();
            expect(typeof res.body.description === 'string').toBeTruthy();
            expect(res.body.availablePlaces).toEqual(4);
            expect(typeof res.body.location === 'string').toBeTruthy();
            expect(genre).toMatch(/Sport/);
            expect(new Date(res.body.startDate).getTime()).not.toBeNaN();
            expect(new Date(res.body.endDate).getTime()).not.toBeNaN();
        });

        it('should find the created event on the database', async () => {
            const res = await exec();
            const event = await Event.findById(res.body._id) as IEvent;

            expect(event).toBeDefined();
        });
    });



    describe('PUT /:id', () => {
        let participants: mongoose.Types.ObjectId[] | string | undefined;
        let title: string | undefined;
        let description: string | undefined;
        let availablePlaces: number | undefined;
        let location: string | undefined;
        let genre: string | undefined;
        let startDate: Date | undefined;
        let endDate: Date | undefined;
        let id: mongoose.Types.ObjectId | string;

        let exec = () => {
            return request(server)
                .put(`/api/events/${id}`)
                .send({ participants, title, description, availablePlaces, location, genre, startDate, endDate })
                .set('cookie', token);
        };

        beforeEach(async () => {
            participants = [];
            title = 'New title';
            description = 'New description';
            availablePlaces = 4;
            location = 'random location';
            genre = 'Party';
            startDate = new Date(2018, 0, 1, 15);
            endDate = new Date(2018, 0, 1, 18);


            const events = await Event.insertMany([
                {
                    createdBy: user.id,
                    participants: [],
                    title: 'My example event',
                    description: 'example description',
                    availablePlaces: 4,
                    location: "gps daten",
                    genre: 'Sport',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);
            id = events[0].id;

        });

        it('should return status 400 if the ReqParam is not a valid ObjectId', async () => {
            id = 'wrongId'
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if no event with the given id was found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/event with the given id/);
        });

        it('should return status 400 if the req.body is missing participants', async () => {
            participants = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/participants/);
        });

        it('should return status 400 if the req.body is missing a title', async () => {
            title = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/title/);
        });

        it('should return status 400 if the req.body is missing a description', async () => {
            description = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/description/);
        });

        it('should return status 400 if the req.body is missing availablePlaces', async () => {
            availablePlaces = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/availablePlaces/);
        });

        it('should return status 400 if the availablePlaces is smaller 1', async () => {
            availablePlaces = 0;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/larger than or equal to 1/);
        });

        it('should return status 400 if the availablePlaces is greater than 255', async () => {
            availablePlaces = 256;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/less than or equal to 255/);
        });

        it('should return status 400 if the req.body is missing the location', async () => {
            location = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/location/);
        });

        it('should return status 400 if the req.body is missing a genre', async () => {
            genre = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/genre/);
        });

        it('should return status 400 if the genre is not valid', async () => {
            genre = 'Unbekanntes Genre';
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/genre/);
        });

        it('should return status 400 if the req.body is missing a startDate', async () => {
            startDate = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/startDate/);
        });

        it('should return status 400 if the req.body is missing a endDate', async () => {
            endDate = undefined;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/endDate/);
        });

        it('should return status 403 if the caller of the function is not the one who created the event', async () => {
            let events = await Event.insertMany([
                {
                    createdBy: mongoose.Types.ObjectId(),
                    title: 'My example title',
                    description: 'Example description',
                    participants: [],
                    availablePlaces: 4,
                    location: "gps daten",
                    genre: 'Other',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);

            const res = await request(server)
                .put(`/api/events/${events[0].id}`)
                .send({ participants, title, description, availablePlaces, location, genre, startDate, endDate })
                .set('cookie', token);

            expect(res.status).toBe(403);
            expect(res.body.message).toMatch(/not authorized to update/);
        });

        it('should return status 200 and the updated event', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.genre).toEqual('Party');
        });

        it('should find the updated event on the database', async () => {
            const res = await exec();
            const event = await Event.findOne({ genre: 'Party' }) as IEvent;
            expect(event.id).toEqual(id);
        });
    });



    describe('PATCH /join/:id', () => {
        let id: mongoose.Types.ObjectId | string | undefined;

        const exec = () => {
            return request(server)
                .patch(`/api/events/join/${id}`)
                .set('cookie', token);
        };

        beforeEach(async () => {
            const events = await Event.insertMany([
                {
                    createdBy: mongoose.Types.ObjectId(),
                    participants: [],
                    title: 'My example event',
                    description: 'example description',
                    availablePlaces: 2,
                    location: "gps daten",
                    genre: 'Sport',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);
            id = events[0].id;
        });

        it('should return status 400 if the ReqParam is not a valid ObjectId', async () => {
            id = 'wrongId'
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if no event with the given id was found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/event with the given id/);
        });

        it('should return 403 if you already participate at the event', async () => {
            const res = await exec();
            const res2 = await exec();

            expect(res2.status).toBe(403);
            expect(res2.body.message).toMatch(/already participate at this event/)
        });

        it('should return 403 when the creater wants to join his own event', async () => {
            const events = await Event.insertMany([
                {
                    createdBy: user.id,
                    participants: [],
                    title: 'My example event',
                    description: 'example description',
                    availablePlaces: 2,
                    location: "gps daten",
                    genre: 'Sport',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);

            const res = await request(server)
                .patch(`/api/events/join/${events[0].id}`)
                .set('cookie', token);

            expect(res.status).toBe(403);
            expect(res.body.message).toMatch(/can not join your own event/);
        });

        it('should not be possible to join an event which is already full', async () => {
            const event = await Event.findById(id) as IEvent;
            event.participants.push(mongoose.Types.ObjectId());
            event.participants.push(mongoose.Types.ObjectId());
            await event.save();
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/event is already full/);
        });

        it('should return 204 if successfully joined the event', async () => {
            const res = await exec();
            expect(res.status).toBe(204);
        });

        it('should save the caller of the method in the participant list', async () => {
            const res = await exec();
            const event = await Event.findById(id);

            expect(event!.participants.some(eventId => eventId == user.id));
        });
    });



    describe('PATCH /leave/:id', () => {
        let id: mongoose.Types.ObjectId | string | undefined;

        const exec = () => {
            return request(server)
                .patch(`/api/events/leave/${id}`)
                .set('cookie', token);
        };

        beforeEach(async () => {
            const events = await Event.insertMany([
                {
                    createdBy: mongoose.Types.ObjectId(),
                    participants: [user.id],
                    title: 'My example event',
                    description: 'example description',
                    availablePlaces: 2,
                    location: "gps daten",
                    genre: 'Sport',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);
            id = events[0].id;
        });

        it('should return status 400 if the ReqParam is not a valid ObjectId', async () => {
            id = 'wrongId'
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if no event with the given id was found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/event with the given id/);
        });

        it('should return 404 if you not part of the event', async () => {
            const res = await exec();
            const res2 = await exec();

            expect(res2.status).toBe(404);
            expect(res2.body.message).toMatch(/are not participating in this event/);
        });

        it('should return 204 if successfully left the event', async () => {
            const res = await exec();
            expect(res.status).toBe(204);
        });

        it('should not be able to find the caller in the participant list', async () => {
            const res = await exec();
            const event = await Event.findById(id) as IEvent

            expect(event.participants.some(eventId => eventId == user.id)).toBeFalsy();
        });
    });



    describe('DELETE /:id', () => {
        let id: mongoose.Types.ObjectId | string | undefined;

        const exec = () => {
            return request(server)
                .delete(`/api/events/${id}`)
                .set('cookie', token);
        };

        beforeEach(async () => {
            const events = await Event.insertMany([
                {
                    createdBy: user.id,
                    participants: [user.id],
                    title: 'My example event',
                    description: 'example description',
                    availablePlaces: 2,
                    location: "gps daten",
                    genre: 'Sport',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);
            id = events[0].id;
        });

        it('should return status 400 if the ReqParam is not a valid ObjectId', async () => {
            id = 'wrongId'
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if no event with the given id was found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/event with the given id/);
        });

        it('should return status 403 if the caller of the function is not the one who created the event', async () => {
            let events = await Event.insertMany([
                {
                    createdBy: mongoose.Types.ObjectId(),
                    title: 'My example title',
                    description: 'Example description',
                    participants: [],
                    availablePlaces: 4,
                    location: "gps daten",
                    genre: 'Other',
                    startDate: new Date(2018, 0, 1, 18),
                    endDate: new Date(2018, 0, 1, 18)
                }
            ]);

            const res = await request(server)
                .delete(`/api/events/${events[0].id}`)
                .set('cookie', token);

            expect(res.status).toBe(403);
            expect(res.body.message).toMatch(/not authorized to delete/);
        });

        it('should return 204 if the event was successfully deleted', async () => {
            const res = await exec();
            expect(res.status).toBe(204);
        });

        it('should not be able to find the deleted event', async () => {
            const res = await exec();
            const event = await Event.findById(id);

            expect(event).not.toBeTruthy();
        });
    });
});