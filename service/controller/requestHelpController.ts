
import { Request, Response } from 'express';
import { twilioClient } from '../services/twilioClient/twilioClient';
import { PhoneNumberInstance } from 'twilio/lib/rest/lookups/v1/phoneNumber';
import { constants } from '../constants/constants';

export const requestHelpController = async (req: Request, res: Response) => {
    try {
        const phone = req.body.phone;
        const twilioRes = await twilioClient.client.lookups.phoneNumbers(phone).fetch({type: ['carrier']});

        if (isMobile(twilioRes)) {
            twilioClient.client.messages.create({
                body: 'Thank you for being a loyal customer. For help please use the following link to join a video chat with one of our reps. <link goes here>',
                to: twilioRes.phoneNumber,
                from: constants.TWILIO_NUMBER
            }).then(message => {
                res.status(200).send(message);
            }).catch(message => {
                res.status(400).send(message);
            });
        } else {
            throw ({
                status: 400,
                message: 'The number provided is not from a mobile phone'
            })
        }

    } catch (error) {
        res.status(error.status).send({message: error.message, code: error.code});
    }
};

const isMobile = (phoneInstance: PhoneNumberInstance) => {
    return phoneInstance.carrier.type === 'mobile';
}
