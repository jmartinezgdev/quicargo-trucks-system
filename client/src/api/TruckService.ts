import { Truck } from "../interfaces";
import httpClient from "./http";

const TRUCKS_PATH = '/trucks';

const getAll = (): Promise<Truck[]> => {
    return httpClient.get(TRUCKS_PATH);
}

const getById = (id: number): Promise<Truck> => {
    return httpClient.get(`${TRUCKS_PATH}/${id}`);
}

const create = (newTruck: Truck): Promise<Truck> => {
    return httpClient.post(TRUCKS_PATH, newTruck);
}

const update = (newTruck: Truck): Promise<Truck> => {
    return httpClient.put(TRUCKS_PATH, newTruck);
}

const remove = (id: number): Promise<void> => {
    return httpClient.delete(`${TRUCKS_PATH}/${id}`);
}

const TruckService = {
    getAll,
    getById,
    create,
    update,
    remove
  };
  
export default TruckService;