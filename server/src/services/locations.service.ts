import { DestroyOptions, FindOptions } from "sequelize";
import { Location } from "../db/models/location.model";

export class LocationService {
    public get = (): Promise<Location[]> => Location.findAll<Location>({});

    public getById = (id: number): Promise<Location> => Location.findByPk<Location>(id);

    public getByTruckId = async (truckId: number, limit: number = null): Promise<Location[]> => {
        const options: FindOptions = {
            where: { truckId },
            order: [
                ['dateAndTime', 'DESC']
            ],
            limit
        }
        return Location.findAll<Location>(options);
    }

    public create = (newLocation: Location): Promise<Location> => Location.create<Location>(newLocation);

    public delete = (id: number): Promise<number> => {
        const destroyOptions: DestroyOptions = {
            where: { id },
            limit: 1
        }
        return Location.destroy(destroyOptions);
    }
}
