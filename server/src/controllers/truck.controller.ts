import { Request, Response } from "express";
import { errorMessages } from "../constants/errors.constants";
import { Truck } from "../db/models/truck.model";
import { TruckService } from "../services/truck.service";
/**
 * Class Representing Truck Controller
 * @class
 */
export class TruckController {
    private truckService: TruckService;

    constructor() {
        this.truckService = new TruckService();
    }

    /**
     * Get trucks.
     * @param {Request} req 
     * @param {Response} res
     */
    public get = async (_req: Request, res: Response): Promise<void> => {
        try {
            const trucks: Truck[] = await this.truckService.get();
            res.json(trucks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Get a truck by Id
     * @param {Request} req 
     * @param {Response} res
     */
    public getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            const truck: Truck = await this.truckService.getById(id);
            truck ? res.json(truck) : res.status(404).json({ error: errorMessages.truck.TRUCK_NOT_FOUND });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Create truck
     * @param {Request} req 
     * @param {Response} res
     */
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newTruck: Truck = req.body;
            const createdTruck = await this.truckService.create(newTruck);
            res.status(201).json(createdTruck);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Update truck
     * @param {Request} req 
     * @param {Response} res
     */
    public update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            const truck: Truck = req.body;
            const [, [updatedTruck]] = await this.truckService.update(id, truck);
            updatedTruck ?
                res.status(200).json(updatedTruck) :
                res.status(404).json({ error: errorMessages.truck.TRUCK_NOT_FOUND });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Delete truck
     * @param {Request} req 
     * @param {Response} res
     */
    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            await this.truckService.delete(id);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
