import { Request, Response } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';

export class AppValidator {

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

    public processErrors(req: Request, res: Response, next: Function) {
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
