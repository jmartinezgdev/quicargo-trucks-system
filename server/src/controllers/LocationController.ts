import { Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { ERROR_MESSAGES } from "../constants/errors";
import Location from "../models/LocationModel";
import LocationService from "../services/LocationService";

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
        } catch (error) {
            res.status(500).json({ message: error.message });
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
            location ? res.json(location) : res.status(404).json({ message: ERROR_MESSAGES.location.LOCATION_NOT_FOUND });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
            const limit: number = Number(req.query.limit) || null;
            const locations: Location[] = await this.locationService.getByTruckId(truckId, limit);
            res.json(locations);
        } catch (error) {
            res.status(500).json({ message: error.message });
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
        } catch (error) {
            let message = error.message;

            if (error instanceof ForeignKeyConstraintError) {
                message = ERROR_MESSAGES.common.TRUCK_NOT_FOUND;
            } else if (error instanceof UniqueConstraintError) {
                message = ERROR_MESSAGES.location.LOCATION_EXIST;
            }
            res.status(500).json({ message });
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
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}