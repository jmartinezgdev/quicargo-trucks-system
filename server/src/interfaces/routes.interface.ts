import { Application } from "express";

export interface IRoutes {
    router(app: Application, apiPath: string): void;
}