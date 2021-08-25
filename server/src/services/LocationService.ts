import { DestroyOptions, FindOptions } from "sequelize";
import  Location  from "../models/LocationModel";

/**
 * Class representing Location Service
 * @class
 */
export default class LocationService {
    /**
     * Get all Locations
     * @returns {Promise<Location[]>}
     */
    public get = (): Promise<Location[]> => Location.findAll<Location>({});

    /**
     * Get a location by Id
     * @param {number} id 
     * @returns {Promise<Location>}
     */
    public getById = (id: number): Promise<Location> => Location.findByPk<Location>(id);

    /**
     * Get limit of locations by truck Id
     * @param {number} truckId 
     * @param {limit} limit 
     * @returns {Promise<Location[]>}
     */
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
    /**
     * Create a location
     * @param {Location} newLocation 
     * @returns {Promise<Location>}
     */
    public create = (newLocation: Location): Promise<Location> => Location.create<Location>(newLocation);

    /**
     * Delete a location
     * @param {number} id 
     * @returns {Promise<number>} Amount of deleted records
     */
    public delete = (id: number): Promise<number> => {
        const destroyOptions: DestroyOptions = {
            where: { id },
            limit: 1
        }
        return Location.destroy(destroyOptions);
    }
}
