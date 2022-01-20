// Dependencies
import { interfaces } from "inversify";

// Repositories
import { UserRepository } from "@apps/repositories/UserRepository";

// Services
import { UserService } from "@apps/services/UserService";
import { MovieService } from "@apps/services/MovieService";

export class ApplicationModule {
    private readonly _repositories = [UserRepository];
    private readonly _services = [UserService, MovieService];

    constructor(private readonly _bind: interfaces.Bind) {
        this.bindRepositories();
        this.bindServices();
    }

    private bindRepositories() {
        this._repositories.forEach((repository) => {
            this._bind(Object(repository)).toSelf();
        });
    }

    private bindServices() {
        this._services.forEach((service) => {
            this._bind(Object(service)).toSelf();
        });
    }
}
