// Import Dependencies
import { Container } from "inversify";

// Import Applications
import { config } from "@apps/common/config/Config";
import { Database } from "@apps/infrastructure/Database";
import { App } from "App";

(function main() {
    const { server } = config;

    const container = new Container();
    const app = new App(container, server.port);
    const database = Database.getInstance();

    database
        .connect()
        .then(() => {
            console.log("Connected to Database");
            app.start();
        })
        .catch((err) => console.log("Connection Error ", err));
})();
