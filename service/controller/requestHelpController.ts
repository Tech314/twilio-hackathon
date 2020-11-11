
import { Request, Response } from 'express';
import { twilioClient } from '../services/twilioClient/twilioClient';
import { PhoneNumberInstance } from 'twilio/lib/rest/lookups/v1/phoneNumber';
import { constants } from '../constants/constants';
import { v4 } from 'uuid';
import { mySqlService } from '../services/mySql/mySqlService';

export const requestHelpController = async (req: Request, res: Response) => {
    try {
        const phone = req.body.phone;
        const twilioRes = await twilioClient.client.lookups.phoneNumbers(phone).fetch({type: ['carrier']});

        if (isMobile(twilioRes)) {
            const roomId = await generateRoomId();
            twilioClient.client.messages.create({
                body: `Thank you for your interest in Credit One Bank’s real-time video support. Click the link below to connect with your personal Account Manager, standing by to answer all your questions. https://www.creditonebank.com?name=${roomId}`,
                to: twilioRes.phoneNumber,
                from: constants.TWILIO_NUMBER,

            }).then(() => {
                res.status(200).redirect('https://creditoneinteractive.com/development/1-3-1/corporate/high-yield/cd?announce=twilio');
            }).catch(() => {
                res.status(400).redirect('https://creditoneinteractive.com/development/1-3-1/corporate/high-yield/cd?danger=messageFailed');
            });
        } else {
            throw ({
                status: 400,
                message: 'The number provided is not from a mobile phone'
            });
        }

    } catch (error) {
        if (error.message === 'The number provided is not from a mobile phone') {
            res.status(error.status).redirect('https://creditoneinteractive.com/development/1-3-1/corporate/high-yield/cd?danger=notMobile');
        } else {
            res.status(error.status).redirect('https://creditoneinteractive.com/development/1-3-1/corporate/high-yield/cd?danger=apiFailed');
        }
    }
};

const isMobile = (phoneInstance: PhoneNumberInstance) => {
    return phoneInstance.carrier.type === 'mobile';
}

const generateRoomId = async (failureCount?: number) => {
    const roomId = 'C1B_' + v4();

    try {
        await mySqlService.createRoom(roomId);
        return roomId;
    } catch (_err) {
        if (!failureCount) {
            failureCount = 1;
        }
        if (failureCount > 3) {
            throw {
                status: 400,
                message: 'Unable to create video chat room'
            };
        } else {
            await generateRoomId(failureCount + 1);
        }
    }
}
