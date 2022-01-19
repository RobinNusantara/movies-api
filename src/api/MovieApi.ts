import { HttpClient } from "@apps/api/HttpClient";
import { config } from "@apps/common/config/Config";
import { OmdbParam } from "@apps/common/enums/OmdbParamEnum";
import { OmdbMovieDto, MovieDto } from "@apps/dtos/MovieDto";

export class MovieApi extends HttpClient {
    private static _instance?: MovieApi;

    constructor() {
        super(`${config.api.url}/?apikey=${config.api.key}`);
    }

    public static getInstance(): MovieApi {
        if (!this._instance) {
            this._instance = new MovieApi();
        }

        return this._instance;
    }

    public getMoviesByName = async (name: string): Promise<Array<MovieDto>> => {
        const { data } = await this._axiosInstance.get("", {
            params: {
                [OmdbParam.Title]: name,
            },
        });

        const movies = data["Search"] as Array<OmdbMovieDto>;

        return movies.map((movie) => MovieDto.fromOmdbMovie(movie));
    };
}
