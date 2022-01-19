// Import Dependencies
import { controller, httpGet, queryParam } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/lib/results";

// Import Applications
import { HttpControllerBase } from "@apps/common/base/HttpControllerBase";
import { MovieService } from "@apps/services/MovieService";

@controller("/movies")
export class MovieController extends HttpControllerBase {
    constructor(private readonly _movieService: MovieService) {
        super();
    }

    @httpGet("/")
    async getMovies(@queryParam("name") name: string): Promise<JsonResult> {
        const data = await this._movieService.getMovies(name);

        return this.response(data);
    }
}
