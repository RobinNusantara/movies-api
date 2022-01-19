// Import Dependencies
import { controller, httpGet, queryParam } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/lib/results";

// Import Applications
import { MovieApi } from "@apps/api/MovieApi";
import { HttpControllerBase } from "@apps/common/base/HttpControllerBase";

@controller("/movies")
export class MovieController extends HttpControllerBase {
    @httpGet("/")
    async getMovies(@queryParam("name") name: string): Promise<JsonResult> {
        const api = MovieApi.getInstance();

        const data = await api.getMoviesByName(name);

        return this.response(data);
    }
}
