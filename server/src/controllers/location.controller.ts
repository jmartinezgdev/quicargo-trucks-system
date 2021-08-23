import { Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { errorMessages } from "../constants/errors.constants";
import { Location } from "../db/models/location.model";
import { LocationService } from "../services/location.service";

/**
 *  Class representing Location Controller
 * @class
 */
export class LocationController {
    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    /**
     * Get locations
     * @param {Request} req 
     * @param {Response} res
     */
    public get = async (_req: Request, res: Response): Promise<void> => {
        try {
            const locations: Location[] = await this.locationService.get();
            res.json(locations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Get location by Id
     * @param {Request} req 
     * @param {Response} res
     */
    public getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            const location: Location = await this.locationService.getById(id);
            location ? res.json(location) : res.status(404).json({ error: errorMessages.location.LOCATION_NOT_FOUND });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Get limit of locations by truck Id
     * @param {Request} req 
     * @param {Response} res
     */
    public getByTruckId = async (req: Request, res: Response): Promise<void> => {
        try {
            const truckId: number = Number(req.params.truckId);
            const limit: number = Number(req.query.limit);
            const locations: Location[] = await this.locationService.getByTruckId(truckId, limit);
            res.json(locations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Create location
     * @param {Request} req 
     * @param {Response} res
     */
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newLocation: Location = req.body;
            const createdLocation = await this.locationService.create(newLocation);
            res.status(201).json(createdLocation);
        } catch (err) {
            let message = err.message;

            if (err instanceof ForeignKeyConstraintError) {
                message = errorMessages.location.TRUCK_NOT_FOUND;
            } else if (err instanceof UniqueConstraintError) {
                message = errorMessages.location.LOCATION_EXIST;
            }
            res.status(500).json({ error: message });
        }
    }

    /**
     * Delete location
     * @param {Request} req 
     * @param {Response} res
     */
    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            await this.locationService.delete(id);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}