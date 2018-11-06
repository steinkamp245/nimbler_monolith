import express from 'express';

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (isPreflight(req)) {
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
        res.set('Acces-Control-Max-Age', '120');
        res.status(204).end();
    }
    else { next(); }
};

function isPreflight(req: express.Request) {
    return req.method === 'OPTIONS' &&
        req.get('Origin') && req.get('Access-Control-Request-Method');
}