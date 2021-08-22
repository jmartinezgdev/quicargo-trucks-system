import { Request, Response } from "express";
import { Truck } from "../db/models/truck.model";
import { TrucksService } from "../services/trucks.service";

export class TrucksController {
    private trucksService: TrucksService;

    constructor() {
        this.trucksService = new TrucksService();
    }

    public get = async (_req: Request, res: Response) => {
        try {
            const trucks: Truck[] = await this.trucksService.get();
            res.json(trucks);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const truck: Truck = await this.trucksService.getById(id);
            truck ? res.json(truck) : res.status(404).json({ message: "Truck not found" });
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const newTruck: Truck = req.body;
            const createdTruck = await this.trucksService.create(newTruck);
            res.status(201).json(createdTruck);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    // To Review
    public update = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const truck: Truck = req.body;
            const updatedTruck = await this.trucksService.update(id, truck);

            !updatedTruck[1].length ?
                res.status(404).json({ message: "Truck not found" }) :
                res.status(200).json(updatedTruck[1])
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            await this.trucksService.delete(id);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}
