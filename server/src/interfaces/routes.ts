import { Application } from "express";

export default interface Routes {
    router(app: Application, apiPath: string): void;
}