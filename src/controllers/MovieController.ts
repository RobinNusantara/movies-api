// Import Dependencies
import {
    controller,
    httpGet,
    httpPost,
    queryParam,
    requestBody,
} from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/lib/results";

// Import Applications
import { HttpControllerBase } from "@apps/common/base/HttpControllerBase";
import { MovieService } from "@apps/services/MovieService";
import { Authentication } from "@apps/middlewares/AuthenticationMiddleware";
import { InsertFavoriteMovieDto } from "@apps/dtos/MovieDto";
import { IJwtPayload } from "@apps/common/interfaces/JwtPayloadInterface";

@controller("/movies", Authentication.verify())
export class MovieController extends HttpControllerBase {
    constructor(private readonly _movieService: MovieService) {
        super();
    }

    @httpGet("/")
    async getMoviesByName(
        @queryParam("title") title: string,
    ): Promise<JsonResult> {
        const data = await this._movieService.getMoviesByName(title);

        return this.response(data);
    }

    @httpPost("/favorites")
    async insertFavoriteMovie(
        @requestBody() body: InsertFavoriteMovieDto,
    ): Promise<JsonResult> {
        const user: IJwtPayload = this.httpContext.user.details;

        const data = await this._movieService.insertFavoriteMovie(
            user.id,
            body,
        );

        return this.response(data);
    }

    @httpGet("/favorites")
    async getFavoritesMovies(): Promise<JsonResult> {
        const user: IJwtPayload = this.httpContext.user.details;

        const data = await this._movieService.getFavoritesMovies(user.id);

        return this.response(data);
    }
}
