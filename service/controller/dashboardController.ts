
import { Request, Response } from 'express';
import { mySqlService } from '../services/mySql/mySqlService';

class DashboardController {

    public getAllRooms = async (_req: Request, res: Response) => {
        try {
            const dbRes = await mySqlService.selectAllRooms();
            res.status(200).send(dbRes);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    public getUnjoinedRooms = async (_req: Request, res: Response) => {
        try {
            const dbRes = await mySqlService.selectAllUnjoinedRooms();
            res.status(200).send(dbRes);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    public joinRoom = async (req: Request, res: Response) => {
        try {
            const dbRes = await mySqlService.joinRoom(req.body['roomId']);
            res.status(200).send(dbRes);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    public deleteRoom = async (req: Request, res: Response) => {
        try {
            const dbRes = await mySqlService.removeRoom(req.body['roomId']);
            res.status(200).send(dbRes);
        } catch (err) {
            res.status(400).send(err);
        }
    }

}

export const dashboardController: DashboardController = new DashboardController();
