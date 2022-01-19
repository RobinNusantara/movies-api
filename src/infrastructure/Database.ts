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

    public static getInstance(): Database {
        if (!this._instance) {
            this._instance = new Database();

            const { database } = config;

            const sequelize = new Sequelize({
                dialect: "postgres",
                database: "db_movies_apps",
                ...database,
            });

            sequelize.addModels([UserModel, FavoriteMovieModel]);

            sequelize
                .sync()
                .then(() => console.log("Connected to Database"))
                .catch((err) => console.log(`Connection Error ${err}`));
        }

        return this._instance;
    }
}
