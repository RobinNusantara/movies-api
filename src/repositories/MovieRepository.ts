// Import Dependencies
import { injectable } from "inversify";

// Import Applications
import { IRepository } from "@apps/common/interfaces/RepositoryInterface";
import { MovieDto } from "@apps/dtos/MovieDto";
import { FavoriteMovieModel } from "@apps/models/FavoriteMovieModel";

@injectable()
export class MovieRepository implements IRepository<FavoriteMovieModel> {
    async insert(params: {
        userId: number;
        model: MovieDto;
    }): Promise<FavoriteMovieModel> {
        const { userId, model } = params;

        const movie = new FavoriteMovieModel();

        movie.userId = userId;
        movie.imdbId = model.imdbId;
        movie.title = model.title;
        movie.year = model.year;
        movie.poster = model.poster;

        return await movie.save();
    }

    async indexes(params: {
        userId: number;
    }): Promise<Array<FavoriteMovieModel>> {
        const { userId } = params;

        const movies = await FavoriteMovieModel.findAll({
            where: {
                userId,
            },
        });

        return movies;
    }

    async index(params: {
        userId: number;
        imdbId: string;
    }): Promise<FavoriteMovieModel | null> {
        const { userId, imdbId } = params;

        const movie = await FavoriteMovieModel.findOne({
            where: {
                userId,
                imdbId,
            },
        });

        return movie;
    }

    update(): Promise<FavoriteMovieModel> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
