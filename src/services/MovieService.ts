// Import Dependencies
import { injectable } from "inversify";
import { Conflict } from "http-errors";

// Import Applications
import { MovieApi } from "@apps/api/MovieApi";
import { InsertFavoriteMovieDto, MovieDto } from "@apps/dtos/MovieDto";
import { MovieRepository } from "@apps/repositories/MovieRepository";

@injectable()
export class MovieService {
    constructor(private readonly _movieRepository: MovieRepository) {}

    public async getMoviesByName(name: string): Promise<Array<MovieDto>> {
        const api = MovieApi.getInstance();

        const movies = await api.getMoviesByName(name);

        return movies;
    }

    public async insertFavoriteMovie(
        userId: number,
        body: InsertFavoriteMovieDto,
    ): Promise<MovieDto> {
        const api = MovieApi.getInstance();

        const data = await api.getMovieById(body.imdbId);

        await this.isMovieFavorited(userId, body.imdbId);

        const movie = await this._movieRepository.insert({
            userId,
            model: {
                imdbId: body.imdbId,
                title: data.title,
                type: data.type,
                year: data.year,
                poster: data.poster,
            },
        });

        return MovieDto.fromMovieModel(movie);
    }

    public async getFavoritesMovies(userId: number): Promise<Array<MovieDto>> {
        const movies = await this._movieRepository.indexes({
            userId,
        });

        return movies.map((movie) => MovieDto.fromMovieModel(movie));
    }

    private async isMovieFavorited(
        userId: number,
        imdbId: string,
    ): Promise<boolean> {
        const movie = await this._movieRepository.index({
            userId,
            imdbId,
        });

        if (movie) throw new Conflict("Movie already in favorite list");

        return false;
    }
}
