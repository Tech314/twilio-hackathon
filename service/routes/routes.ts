
import { Request, Response, Router } from 'express';

export const apiRoutes = (router: Router) => {

    router.get('/test', (_req: Request, res: Response) => {
        res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
        <Response><Message>This is the Twilio + Credit One Bank Hackathon Winning Teams Test Response</Message></Response>`
        )
    } )
    return router;
};