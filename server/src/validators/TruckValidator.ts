import { ValidationChain, param, body } from 'express-validator';
import { ERROR_MESSAGES } from '../constants/errors';
import AppValidator from './AppValidator';

export class TruckValidator extends AppValidator {
    private idValidator: ValidationChain[] = [param('id', ERROR_MESSAGES.common.ID_INVALID).isInt()];

    public getByIdValidator: ValidationChain[] = [...this.idValidator];

    public createValidator: ValidationChain[] = [
        body('model', ERROR_MESSAGES.truck.MODEL_REQUIRED).not().isEmpty(),
        body('year', ERROR_MESSAGES.truck.YEAR_INVALID).isInt({ min: 1900, max: new Date().getFullYear() }),
        body('licensePlate', ERROR_MESSAGES.truck.LICENCE_PLATE_REQUIRED).not().isEmpty(),
        body('currentKm', ERROR_MESSAGES.truck.CURRENT_KM_INVALID).isFloat({ min: 0 }),
        body('maximumLoadKg', ERROR_MESSAGES.truck.MAXIMUM_LOAD_KG_INVALID).isFloat({ min: 0 }),
        body('fuelType', ERROR_MESSAGES.truck.FUEL_TYPE_REQUIRED).not().isEmpty()
    ]

    public updateValidator: ValidationChain[] = [
        ...this.idValidator,
        body('year', ERROR_MESSAGES.truck.YEAR_INVALID).optional().isInt({ min: 1900, max: new Date().getFullYear() }),
        body('currentKm', ERROR_MESSAGES.truck.CURRENT_KM_INVALID).optional().isFloat({ min: 0 }),
        body('maximumLoadKg', ERROR_MESSAGES.truck.MAXIMUM_LOAD_KG_INVALID).optional().isFloat({ min: 0 })
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.idValidator
    ]
}
