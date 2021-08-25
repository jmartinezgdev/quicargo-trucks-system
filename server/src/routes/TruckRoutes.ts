import { Application } from "express";
import { TruckController } from "../controllers/TruckController";
import { TRUCKS_PATH } from "../env";
import Routes from "../interfaces/routes";
import { TruckValidator } from "../validators/TruckValidator";

/**
 * Class representing Truck Routes
 * @class
 */
export default class TruckRoutes implements Routes {
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