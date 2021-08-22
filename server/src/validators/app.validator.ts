import { Request, Response } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';

/**
 * Class representing AppValidator
 * @class
 */
export class AppValidator {

    /**
     * Get a list of errors thrown by express validators
     * @param {Request} req 
     * @returns {ValidationError[]}
     */
    private static getErrors(req: Request): ValidationError[] {
        const errors: Result<ValidationError> = validationResult(req)
        const messages: ValidationError[] = []
        if (!errors.isEmpty()) {
            for (const i of errors.array()) {
                messages.push(i);
            }
        }
        return messages;
    }

    /**
     * Process Errors thrown by express validators
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns {Response<unknown> | void} 
     */
    public processErrors(req: Request, res: Response, next: Function): Response<unknown> | void {
        const errors: ValidationError[] = AppValidator.getErrors(req);
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            });
        }
        next();
    }
}
