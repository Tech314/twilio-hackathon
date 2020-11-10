
import { getEnvVariable } from '../../env';
import * as twilio from 'twilio';

class TwilioClient {

    private accountSid;
    private authToken;

    public activate = () => {
        this.accountSid = getEnvVariable('TWILIO_ACCOUNT_SID');
        this.authToken = getEnvVariable('TWILIO_AUTH_TOKEN');
    }

    public get client() {
        return twilio(this.accountSid, this.authToken);
    }
}

export const twilioClient: TwilioClient = new TwilioClient();
