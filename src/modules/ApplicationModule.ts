// Dependencies
import { interfaces } from "inversify";

// Services
import { MovieService } from "@apps/services/MovieService";

export class ApplicationModule {
    private readonly _services = [MovieService];

    constructor(private readonly _bind: interfaces.Bind) {
        this.bindServices();
    }

    private bindServices() {
        this._services.forEach((service) => {
            this._bind(Object(service)).toSelf();
        });
    }
}
