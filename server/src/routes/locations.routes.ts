
import { Application } from "express";
import { LocationsController } from "../controllers/locations.controller";
import { IRoutes } from "../interfaces/routes.interface";
import { LocationsValidator } from "../validators/locations.validator";

export default class LocationsRoutes implements IRoutes {
    private locationsController: LocationsController;
    private locationsValidator: LocationsValidator;

    constructor() {
        this.locationsController = new LocationsController();
        this.locationsValidator = new LocationsValidator();
    }

    public router(app: Application, apiPath: string): void {
        app.route(`${apiPath}/locations`)
            .get(this.locationsController.get)
            .post(
                this.locationsValidator.createValidator,
                this.locationsValidator.processErrors,
                this.locationsController.create);

        app.route(`${apiPath}/locations/:id`)
            .get(
                this.locationsValidator.getByIdValidator,
                this.locationsValidator.processErrors,
                this.locationsController.getById)
            .delete(
                this.locationsValidator.deleteValidator,
                this.locationsValidator.processErrors,
                this.locationsController.delete);

        app.route(`${apiPath}/locations/truck/:truckId`)
            .get(
                this.locationsValidator.getByTruckIdValidator,
                this.locationsValidator.processErrors,
                this.locationsController.getByTruckId)

    }
}