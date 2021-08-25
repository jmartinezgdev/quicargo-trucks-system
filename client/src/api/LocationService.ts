import httpClient from "./http";
import { Location } from "../interfaces";

const LOCATIONS_PATH = '/locations';

const getAll = (): Promise<Location[]> => {
    return httpClient.get(LOCATIONS_PATH);
}

const getById = (id: number): Promise<Location> => {
    return httpClient.get(`${LOCATIONS_PATH}/${id}`);
}

const getByTruckId = (truckId: number, limit?: number | null): Promise<Location[]> => {
    const partialUrl = limit ? `${truckId}?limit=${limit}` : `${truckId}`;
    return httpClient.get(`${LOCATIONS_PATH}/truck/${partialUrl}`);
}

const create = (newLocation: Location): Promise<Location> => {
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