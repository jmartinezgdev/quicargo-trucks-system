
import { DestroyOptions, UpdateOptions } from "sequelize";
import { Truck } from "../db/models/truck.model";

/**
 * Class representing Truck Service
 * @class
 */
export class TruckService {
    /**
     * Get all trucks
     * @returns {Promise<Truck[]>} 
     */
    public get = (): Promise<Truck[]> => Truck.findAll<Truck>({});

    /**
     * Get a truck by Id
     * @param {number} id 
     * @returns {Promise<Truck>}
     */
    public getById = (id: number): Promise<Truck> => Truck.findByPk<Truck>(id);

    /**
     * Create a truck
     * @param {Truck} newTruck 
     * @returns {Promise<Truck>} 
     */
    public create = (newTruck: Truck): Promise<Truck> => Truck.create<Truck>(newTruck);

    /**
     * Update a truck
     * @param {number} id 
     * @param {Truck} truck 
     * @returns {Promise<Truck[]>}
     */
    public update = (id: number, truck: Truck): Promise<[number, Truck[]]> => {
        const updateOptions: UpdateOptions = {
            where: { id },
            limit: 1,
            returning: true
        };
        return Truck.update(truck, updateOptions);
    }

    /**
     * Delete a truck
     * @param {number} id 
     * @returns {Promise<number>} Amount of deleted records
     */
    public delete = (id: number): Promise<number> => {
        const destroyOptions: DestroyOptions = {
            where: { id },
            limit: 1
        }
        return Truck.destroy(destroyOptions);
    }
}
