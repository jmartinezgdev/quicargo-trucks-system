import { Request, Response } from "express";
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
     * Get all locations
     * @param {Request} req 
     * @param {Response} res
     */
    public get = async (_req: Request, res: Response): Promise<void> => {
        try {
            const locations: Location[] = await this.locationService.get();
            res.json(locations);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    /**
     * Get a location by Id
     * @param {Request} req 
     * @param {Response} res
     */
    public getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            const location: Location = await this.locationService.getById(id);
            location ? res.json(location) : res.status(404).json({ message: "Location not found" });
        } catch (err) {
            res.status(500).json(err.message)
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
            res.status(500).json(err.message)
        }
    }

    /**
     * Create a location
     * @param {Request} req 
     * @param {Response} res
     */
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newLocation: Location = req.body;
            const createdLocation = await this.locationService.create(newLocation);
            res.status(201).json(createdLocation);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    /**
     * Delete a location
     * @param {Request} req 
     * @param {Response} res
     */
    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            await this.locationService.delete(id);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    /*public async update(req: Request, res: Response) {
       try {
           const id: number = Number(req.params.id);
           const params: Location = req.body;

           const updateOptions: UpdateOptions = {
               where: { id },
               limit: 1,
           };
           const updatedLocation = await Location.update(params, updateOptions);
           res.status(202).json({ message: "Done" });
       } catch (err) {
           res.status(500).json(err.message)
       }
   }*/
}