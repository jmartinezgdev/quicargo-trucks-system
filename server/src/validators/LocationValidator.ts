import { ValidationChain, param, body, query } from 'express-validator';
import { ERROR_MESSAGES } from '../constants/errors';
import AppValidator from './AppValidator';

export class LocationValidator extends AppValidator {
    private idValidator: ValidationChain[] = [param('id', ERROR_MESSAGES.common.ID_INVALID).isInt()];

    public getByIdValidator: ValidationChain[] = [...this.idValidator];

    public createValidator: ValidationChain[] = [
        body('truckId', ERROR_MESSAGES.location.TRUCK_ID_INVALID).isInt().isInt({ gt: 0 }),
        body('latitude', ERROR_MESSAGES.location.LATITUDE_INVALID).isFloat({ min: -90, max: 90 }),
        body('longitude', ERROR_MESSAGES.location.LONGITUDE_INVALID).isFloat({ min: -180, max: 180 }),
        body('dateAndTime', ERROR_MESSAGES.location.DATE_AND_TIME_REQUIRED).not().isEmpty()
    ]

    public getByTruckIdValidator: ValidationChain[] = [
        param('truckId', ERROR_MESSAGES.location.TRUCK_ID_INVALID).isInt({ gt: 0 }),
        query('limit', ERROR_MESSAGES.location.LIMIT_INVALID).optional().isInt({ gt: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.idValidator
    ]
}
