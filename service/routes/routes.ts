
import { Request, Response, Router } from 'express';
import { requestHelpController } from '../controller/requestHelpController';
import { dashboardController } from '../controller/dashboardController';

export const apiRoutes = (router: Router) => {

    router.get('/test', (_req: Request, res: Response) => {
        res.status(200)
            .set('Content-Type', 'text/xml')
            .send('<?xml version="1.0" encoding="UTF-8"?><Response><Message>This is the Twilio + Credit One Bank Hackathon Winning Teams Test Response</Message></Response>');
    } );

    router.post('/request/help', requestHelpController);

    router.get('/dashboard/getAll', dashboardController.getAllRooms);
    router.get('/dashboard/getUnjoined', dashboardController.getUnjoinedRooms);
    router.post('/dashboard/join', dashboardController.joinRoom);
    router.post('/dashboard/delete', dashboardController.deleteRoom);
    return router;
};