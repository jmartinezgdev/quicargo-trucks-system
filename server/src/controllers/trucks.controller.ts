import { Request, Response } from "express";

export class TrucksController {
    public index (_req: Request, res: Response) {
        res.json({message: "Trucks Routes Done"});
    }
}