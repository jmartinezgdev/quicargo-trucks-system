
import { DestroyOptions, UpdateOptions } from "sequelize";
import { Truck } from "../db/models/truck.model";

export class TrucksService {
    public get = (): Promise<Truck[]> => Truck.findAll<Truck>({});

    public getById = (id: number): Promise<Truck> =>Truck.findByPk<Truck>(id);

    public create = (newTruck: Truck): Promise<Truck> => Truck.create<Truck>(newTruck);

    public update = (id: number, truck: Truck): Promise<[number, Truck[]]> => {
        const updateOptions: UpdateOptions = {
            where: { id },
            limit: 1,
            returning: true
        };
        return Truck.update(truck, updateOptions);
    }
    
    public delete = (id: number): Promise<number> => {
        const destroyOptions: DestroyOptions = {
            where: { id },
            limit: 1
        }
        return Truck.destroy(destroyOptions);
    }
}
