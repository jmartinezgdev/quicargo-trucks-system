import { ValidationChain, param, body, query } from 'express-validator';
import { AppValidator } from './app.validator';

export class LocationValidator extends AppValidator {
    private IdValidator: ValidationChain[] = [param('id', 'Invalid Location Id').isInt()];

    public getByIdValidator: ValidationChain[] = [...this.IdValidator];

    public createValidator: ValidationChain[] = [
        body('truckId', 'truckId should be numeric').isInt(),
        body('latitude', 'latitude should be numeric').isNumeric(),
        body('longitude', 'longitude should be numeric').isNumeric(),
        body('dateAndTime', 'dateAndTime should be a valid date').not().isEmpty()
    ]

    public getByTruckIdValidator: ValidationChain[] = [
        param('truckId', 'Invalid Truck Id').isInt(),
        query('limit', 'limit should be a number bigger than 0').optional().isInt({ gt: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.IdValidator
    ]
}
