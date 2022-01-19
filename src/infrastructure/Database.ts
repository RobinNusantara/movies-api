// Import Dependencies
import { config as dotenv } from "dotenv";
import { Sequelize } from "sequelize-typescript";

// Import Applications
import { config } from "@apps/common/config/Config";
import { UserModel } from "@apps/models/UserModel";
import { FavoriteMovieModel } from "@apps/models/FavoriteMovieModel";

dotenv();

export class Database {
    private static _instance?: Database;
    public _sequelize: Sequelize;

    public static getInstance(): Database {
        if (!this._instance) {
            this._instance = new Database();
        }

        return this._instance;
    }

    public async connect(): Promise<Sequelize> {
        this._sequelize = new Sequelize({
            dialect: "mysql",
            database: "db_movies_apps",
            ...config.database,
        });

        this._sequelize.addModels([UserModel, FavoriteMovieModel]);

        return this._sequelize.sync();
    }
}
