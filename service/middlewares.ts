import { Request, Response, NextFunction } from 'express';
import { constants } from './constants/constants';
import { AES, enc } from 'crypto-js';

const buildErrorResponse = (res: Response, code: number, errorCode: string, errorMessage?: string) => {
    res.status(code).send({
        error: errorCode,
        error_message: errorMessage
    });
};

export const setApiTimeout = (_req: Request, res: Response, next: NextFunction) => {
    const timeout = constants.API_TIMEOUT;
    res.setTimeout(timeout, () => buildErrorResponse(res, 503, 'request_timeout'));
    next();
};

export const addHeaders = (_req: Request, res: Response, next: NextFunction) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, CSRF-TOKEN, GRUBBER-SEC-TOKEN');
    res.header('Access-Control-Expose-Headers', '');
    next();
};