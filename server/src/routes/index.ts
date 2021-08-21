import { Application } from "express";
import { TrucksController } from "../controllers/trucks.controller";
import { LocationsController } from "../controllers/locations.controller";

export default class Routes {
    private trucksController: TrucksController = new TrucksController();
    private locationsController: LocationsController = new LocationsController();
    public routes(app: Application): void {
        app.route("/api/v1/trucks")
            .get(this.trucksController.index);

        app.route("/api/v1/locations")
            .get(this.locationsController.index);
    }
}