import { Application } from "express";
import { TrucksController } from "../controllers/trucks.controller";
import { IRoutes } from "../interfaces/routes.interface";
import { TrucksValidator } from "../validators/trucks.validator";

export default class TrucksRoutes implements IRoutes {
    private trucksController: TrucksController;
    private truckValidator: TrucksValidator;

    constructor() {
        this.trucksController = new TrucksController();
        this.truckValidator = new TrucksValidator();
    }

    public router(app: Application, apiPath: string): void {
        app.route(`${apiPath}/trucks`)
            .get(this.trucksController.get)
            .post(
                this.truckValidator.createValidator,
                this.truckValidator.processErrors,
                this.trucksController.create);

        app.route(`${apiPath}/trucks/:id`)
            .get(
                this.truckValidator.getByIdValidator,
                this.truckValidator.processErrors,
                this.trucksController.getById)
            .put(
                this.truckValidator.updateValidator,
                this.truckValidator.processErrors,
                this.trucksController.update)
            .delete(
                this.truckValidator.deleteValidator,
                this.truckValidator.processErrors,
                this.trucksController.delete);
    }
}