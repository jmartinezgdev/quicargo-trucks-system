import { Application } from "express";
import { TruckController } from "../controllers/truck.controller";
import { TRUCKS_PATH } from "../env";
import { IRoutes } from "../interfaces/routes.interface";
import { TruckValidator } from "../validators/truck.validator";

/**
 * Class representing Truck Routes
 * @class
 */
export default class TruckRoutes implements IRoutes {
    private truckController: TruckController;
    private truckValidator: TruckValidator;

    constructor() {
        this.truckController = new TruckController();
        this.truckValidator = new TruckValidator();
    }

    /**
     * Create truck endpoints
     * @param {Application} app 
     * @param {string} apiPath 
     */
    public router(app: Application, apiPath: string): void {
        app.route(TRUCKS_PATH)
            .get(this.truckController.get)
            .post(
                this.truckValidator.createValidator,
                this.truckValidator.processErrors,
                this.truckController.create);

        app.route(`${TRUCKS_PATH}/:id`)
            .get(
                this.truckValidator.getByIdValidator,
                this.truckValidator.processErrors,
                this.truckController.getById)
            .put(
                this.truckValidator.updateValidator,
                this.truckValidator.processErrors,
                this.truckController.update)
            .delete(
                this.truckValidator.deleteValidator,
                this.truckValidator.processErrors,
                this.truckController.delete);
    }
}