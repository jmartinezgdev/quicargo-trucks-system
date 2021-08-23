import { ValidationChain, param, body, query } from 'express-validator';
import { errorMessages } from '../constants/errors.constants';
import { AppValidator } from './app.validator';

export class LocationValidator extends AppValidator {
    private IdValidator: ValidationChain[] = [param('id', errorMessages.common.INVALID_ID).isInt()];

    public getByIdValidator: ValidationChain[] = [...this.IdValidator];

    public createValidator: ValidationChain[] = [
        body('truckId', errorMessages.location.INVALID_TRUCK_ID).isInt(),
        body('latitude', errorMessages.location.INVALID_LATITUDE).isNumeric(),
        body('longitude', errorMessages.location.INVALID_LONGITUDE).isNumeric(),
        body('dateAndTime', errorMessages.location.DATE_AND_TIME_REQUIRED).not().isEmpty()
    ]

    public getByTruckIdValidator: ValidationChain[] = [
        param('truckId', errorMessages.location.INVALID_TRUCK_ID).isInt(),
        query('limit', errorMessages.location.INVALID_LIMIT).optional().isInt({ gt: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.IdValidator
    ]
}
