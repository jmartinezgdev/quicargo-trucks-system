import httpClient from "./http";
import { ILocation } from "../interfaces/LocationInterface";

const LOCATIONS_PATH = '/locations';

const getAll = (): Promise<ILocation[]> => {
    return httpClient.get(LOCATIONS_PATH);
}

const getById = (id: number): Promise<ILocation> => {
    return httpClient.get(`${LOCATIONS_PATH}/${id}`);
}

const getByTruckId = (truckId: number, limit?: number): Promise<ILocation[]> => {
    const partialUrl = limit ? `${truckId}?limit=${limit}` : `${truckId}`;
    return httpClient.get(`${LOCATIONS_PATH}/truck/${partialUrl}`);
}

const create = (newLocation: ILocation): Promise<ILocation> => {
    return httpClient.post(LOCATIONS_PATH, newLocation);
}

const remove = (id: number): Promise<void> => {
    return httpClient.delete(`${LOCATIONS_PATH}/${id}`);
}

const LocationService = {
    getAll,
    getById,
    getByTruckId,
    create,
    remove
};

export default LocationService;