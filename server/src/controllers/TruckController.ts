import { Request, Response } from "express";
import { ERROR_MESSAGES } from "../constants/errors";
import Truck from "../models/TruckModel";
import TruckService from "../services/TruckService";
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
        } catch (error) {
            res.status(500).json({ message: error.message });
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
            truck ? res.json(truck) : res.status(404).json({ message: ERROR_MESSAGES.common.TRUCK_NOT_FOUND });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
        } catch (error) {
            res.status(500).json({ message: error.message });
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
                res.status(404).json({ message: ERROR_MESSAGES.common.TRUCK_NOT_FOUND });

        } catch (error) {
            res.status(500).json({ message: error.message });
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
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
