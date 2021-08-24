import httpClient from "./http";
import { ITruck } from "../interfaces/TruckInterface";

const TRUCKS_PATH = '/trucks';

const getAll = (): Promise<ITruck[]> => {
    return httpClient.get(TRUCKS_PATH);
}

const getById = (id: number): Promise<ITruck> => {
    return httpClient.get(`${TRUCKS_PATH}/${id}`);
}

const create = (newTruck: ITruck): Promise<ITruck> => {
    return httpClient.post(TRUCKS_PATH, newTruck);
}

const update = (newTruck: ITruck): Promise<ITruck> => {
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