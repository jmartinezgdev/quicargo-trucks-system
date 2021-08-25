import { ValidationChain, param, body, query } from 'express-validator';
import { errorMessages } from '../constants/errors';
import AppValidator from './AppValidator';

export class LocationValidator extends AppValidator {
    private idValidator: ValidationChain[] = [param('id', errorMessages.common.ID_INVALID).isInt()];

    public getByIdValidator: ValidationChain[] = [...this.idValidator];

    public createValidator: ValidationChain[] = [
        body('truckId', errorMessages.location.TRUCK_ID_INVALID).isInt().isInt({ gt: 0 }),
        body('latitude', errorMessages.location.LATITUDE_INVALID).isFloat({ min: -90, max: 90 }),
        body('longitude', errorMessages.location.LONGITUDE_INVALID).isFloat({ min: -180, max: 180 }),
        body('dateAndTime', errorMessages.location.DATE_AND_TIME_REQUIRED).not().isEmpty()
    ]

    public getByTruckIdValidator: ValidationChain[] = [
        param('truckId', errorMessages.location.TRUCK_ID_INVALID).isInt({ gt: 0 }),
        query('limit', errorMessages.location.LIMIT_INVALID).optional().isInt({ gt: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.idValidator
    ]
}
