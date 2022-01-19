/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */

// Import Dependencies
import "reflect-metadata";
import cors from "cors";
import { Application, json, urlencoded } from "express";
import { Server } from "http";
import { Container, ContainerModule } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";

// Import Applications
import "@apps/controllers/MovieController";
import { ApplicationModule } from "@apps/modules/ApplicationModule";
import { CreateError } from "@apps/middlewares/CreateErrorMiddleware";

export class App {
    private readonly _version: string = process.env.VERSION || "v1";
    private readonly _host: string = process.env.HOST || "localhost";

    constructor(
        private readonly _container: Container,
        private readonly _port: number,
    ) {
        this.containers();
    }

    public start(): Server {
        const server = new InversifyExpressServer(this._container, null, {
            rootPath: `/api/${this._version}`,
        });

        return server
            .setConfig((app) => this.middlewares(app))
            .setErrorConfig((app) => this.errors(app))
            .build()
            .listen(this._port, this._host, () => {
                console.log(`Server running on port ${this._port}`);
            });
    }

    private containers(): void {
        const applications = new ContainerModule((bind) => {
            new ApplicationModule(bind);
        });

        return this._container.load(applications);
    }

    private middlewares(app: Application): void {
        app.use(json());
        app.use(urlencoded({ extended: false }));
        app.use(morgan("dev"));
        app.use(cors());
    }

    private errors(app: Application): void {
        app.use(CreateError.defineErrors);
    }
}
