
import { Application } from "express";
import { LocationController } from "../controllers/location.controller";
import { LOCATIONS_PATH } from "../env";
import { IRoutes } from "../interfaces/routes.interface";
import { LocationValidator } from "../validators/location.validator";

/**
 * Class representing Location Routes
 */
export default class LocationRoutes implements IRoutes {
    private locationController: LocationController;
    private locationValidator: LocationValidator;

    constructor() {
        this.locationController = new LocationController();
        this.locationValidator = new LocationValidator();
    }

    /**
   * Create location endpoints
   * @param {Application} app 
   * @param {string} apiPath 
   */
    public router(app: Application, apiPath: string): void {
        app.route(LOCATIONS_PATH)
            .get(this.locationController.get)
            .post(
                this.locationValidator.createValidator,
                this.locationValidator.processErrors,
                this.locationController.create);

        app.route(`${LOCATIONS_PATH}/:id`)
            .get(
                this.locationValidator.getByIdValidator,
                this.locationValidator.processErrors,
                this.locationController.getById)
            .delete(
                this.locationValidator.deleteValidator,
                this.locationValidator.processErrors,
                this.locationController.delete);

        app.route(`${LOCATIONS_PATH}/truck/:truckId`)
            .get(
                this.locationValidator.getByTruckIdValidator,
                this.locationValidator.processErrors,
                this.locationController.getByTruckId)
    }
}