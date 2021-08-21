import { Request, Response } from "express";

export class LocationsController {
    public index (_req: Request, res: Response) {
        res.json({message: "Locations Routes Done"});
    }
}