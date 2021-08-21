import { Application } from "express";
import { TrucksController } from "../controllers/trucks.controller";

export default class TruckRoutes {
    public trucksController: TrucksController = new TrucksController();
    public routes(app: Application) {
        app.route("/").get(this.trucksController.index);
    }
}