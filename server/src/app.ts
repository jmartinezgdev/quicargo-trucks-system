import * as express from 'express';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import Route from "./routes"
/**
 * Class representing the App
 * @class
 */
class App {
    public app: express.Application;
    private appRoutes: Route;

    constructor() {
        this.app = express();
        this.initSettings();
        this.appRoutes = new Route();
        this.appRoutes.initRoutes(this.app);
    }
    
    private initSettings(): void {
        this.app.use(compression());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(express.json());
        this.app.use(methodOverride());
    }
}

export default new App().app;
