import { Request, Response } from "express";
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
     * Get all trucks.
     * @param {Request} req 
     * @param {Response} res
     */
    public get = async (_req: Request, res: Response): Promise<void> => {
        try {
            const trucks: Truck[] = await this.truckService.get();
            res.json(trucks);
        } catch (err) {
            res.status(500).json(err.message);
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
            truck ? res.json(truck) : res.status(404).json({ message: "Truck not found" });
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    /**
     * Create a truck
     * @param {Request} req 
     * @param {Response} res
     */
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newTruck: Truck = req.body;
            const createdTruck = await this.truckService.create(newTruck);
            res.status(201).json(createdTruck);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    /**
     * Update a truck
     * @param {Request} req 
     * @param {Response} res
     */
    public update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            const truck: Truck = req.body;
            const updatedTruck = await this.truckService.update(id, truck);

            !updatedTruck[1].length ?
                res.status(404).json({ message: "Truck not found" }) :
                res.status(200).json(updatedTruck[1])
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    /**
     * Delete a truck
     * @param {Request} req 
     * @param {Response} res
     */
    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: number = Number(req.params.id);
            await this.truckService.delete(id);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}
