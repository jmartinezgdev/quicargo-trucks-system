import { Application } from "express";
import { API_PATH } from "../env";
import LocationRoutes from "./LocationRoutes";
import TruckRoutes from "./TruckRoutes";

/**
 * Class representing Route
 */
export default class Route {
    private truckRoutes: TruckRoutes;
    private locationRoutes: LocationRoutes;

    constructor() {
        this.truckRoutes = new TruckRoutes();
        this.locationRoutes = new LocationRoutes()
    }

    /**
     * Init System Routes
     * @param {Application} app 
     */
    public initRoutes(app: Application): void {
        this.truckRoutes.router(app, API_PATH);
        this.locationRoutes.router(app, API_PATH);
    }
}