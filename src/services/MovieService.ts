// Import Dependencies
import { injectable } from "inversify";

// Import Applications
import { MovieApi } from "@apps/api/MovieApi";
import { MovieDto } from "@apps/dtos/MovieDto";

@injectable()
export class MovieService {
    public async getMovies(name: string): Promise<Array<MovieDto>> {
        const api = MovieApi.getInstance();

        const movies = await api.getMoviesByName(name);

        return movies;
    }
}
