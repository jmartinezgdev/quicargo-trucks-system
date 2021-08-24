import { ValidationChain, param, body } from 'express-validator';
import { errorMessages } from '../constants/errors.constants';
import { AppValidator } from './app.validator';

export class TruckValidator extends AppValidator {
    private IdValidator: ValidationChain[] = [param('id', errorMessages.common.INVALID_ID).isInt()];

    public getByIdValidator: ValidationChain[] = [...this.IdValidator];

    public createValidator: ValidationChain[] = [
        body('model', errorMessages.truck.MODEL_REQUIRED).not().isEmpty(),
        body('year', errorMessages.truck.INVALID_YEAR).isInt({ min: 1900, max: new Date().getFullYear() }),
        body('licensePlate', errorMessages.truck.LICENCE_PLATE_REQUIRED).not().isEmpty(),
        body('currentKm', errorMessages.truck.INVALID_CURRENT_KM).isFloat({ min: 0 }),
        body('maximumLoadKg', errorMessages.truck.INVALID_MAXIMUM_LOAD_KG).isFloat({ min: 0 }),
        body('fuelType', errorMessages.truck.FUEL_TYPE_REQUIRED).not().isEmpty()
    ]

    public updateValidator: ValidationChain[] = [
        ...this.IdValidator,
        body('currentKm', errorMessages.truck.INVALID_CURRENT_KM).optional().isFloat({ min: 0 }),
        body('maximumLoadKg', errorMessages.truck.INVALID_MAXIMUM_LOAD_KG).optional().isFloat({ min: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.IdValidator
    ]
}
