import * as express from 'express';
import * as compression from 'compression';
import * as methodOverride from 'method-override';
import Routes from "./routes"

class App {
    public app: express.Application;
    public appRoutes: Routes = new Routes();
    constructor() {
        this.app = express();
        this.initSettings();
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
