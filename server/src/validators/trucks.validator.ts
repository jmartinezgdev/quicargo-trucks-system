import { ValidationChain, param, body } from 'express-validator';
import { AppValidator } from './app.validator';

export class TrucksValidator extends AppValidator {
    private IdValidator: ValidationChain[] = [param('id', 'Invalid Truck Id').isInt()];
    
    public getByIdValidator: ValidationChain[] = [...this.IdValidator];

    public createValidator: ValidationChain[] = [
        body('model', 'model is required').not().isEmpty(),
        body('licensePlate', 'licensePlate is required').not().isEmpty(),
        body('currentKm', 'currentKm should be numeric').isNumeric(),
        body('maximumLoadKg', 'maximumLoadKg should be numeric').isNumeric(),
        body('fuelType', '').isString()
    ]

    public updateValidator: ValidationChain[] = [
        ...this.IdValidator,
        body('currentKm', 'currentKm should be numeric').optional().isNumeric(),
        body('maximumLoadKg', 'maximumLoadKg should be numeric').optional().isNumeric(),
        body('fuelType', 'fuelType should be string').optional().isString()
    ]

    public deleteValidator: ValidationChain[] = [
        ...this.IdValidator
    ]
}
