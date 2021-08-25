import { ValidationChain, param, body } from 'express-validator';
import { errorMessages } from '../constants/errors';
import AppValidator from './AppValidator';

export class TruckValidator extends AppValidator {
    private idValidator: ValidationChain[] = [param('id', errorMessages.common.ID_INVALID).isInt()];

    public getByIdValidator: ValidationChain[] = [...this.idValidator];

    public createValidator: ValidationChain[] = [
        body('model', errorMessages.truck.MODEL_REQUIRED).not().isEmpty(),
        body('year', errorMessages.truck.YEAR_INVALID).isInt({ min: 1900, max: new Date().getFullYear() }),
        body('licensePlate', errorMessages.truck.LICENCE_PLATE_REQUIRED).not().isEmpty(),
        body('currentKm', errorMessages.truck.CURRENT_KM_INVALID).isFloat({ min: 0 }),
        body('maximumLoadKg', errorMessages.truck.MAXIMUM_LOAD_KG_INVALID).isFloat({ min: 0 }),
        body('fuelType', errorMessages.truck.FUEL_TYPE_REQUIRED).not().isEmpty()
    ]

    public updateValidator: ValidationChain[] = [
        ...this.idValidator,
        body('year', errorMessages.truck.YEAR_INVALID).optional().isInt({ min: 1900, max: new Date().getFullYear() }),
        body('currentKm', errorMessages.truck.CURRENT_KM_INVALID).optional().isFloat({ min: 0 }),
        body('maximumLoadKg', errorMessages.truck.MAXIMUM_LOAD_KG_INVALID).optional().isFloat({ min: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.idValidator
    ]
}
