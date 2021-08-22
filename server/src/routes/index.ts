import { Application } from "express";
import { API_PATH } from "../env";
import LocationsRoutes from "./locations.routes";
import TrucksRoutes from "./trucks.routes";

export default class Routes {
    private trucksRoutes = new TrucksRoutes();
    private locationsRoutes = new LocationsRoutes()

    public initRoutes(app: Application): void {
        this.trucksRoutes.router(app, API_PATH);
        this.locationsRoutes.router(app, API_PATH);
    }
}