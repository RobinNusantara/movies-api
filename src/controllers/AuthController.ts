// Import Dependencies
import { controller, httpPost, requestBody } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/lib/results";

// Import Applications
import { HttpControllerBase } from "@apps/common/base/HttpControllerBase";
import { SignUpDto, SignInDto } from "@apps/dtos/AuthDto";
import { Validate } from "@apps/middlewares/ValidateMiddleware";
import { UserService } from "@apps/services/UserService";

@controller("/auth")
export class AuthController extends HttpControllerBase {
    constructor(private readonly _userService: UserService) {
        super();
    }

    @httpPost("/signup", Validate.requestBody(SignUpDto))
    async signup(@requestBody() body: SignUpDto): Promise<JsonResult> {
        const data = await this._userService.signup(body);

        return this.response(data);
    }

    @httpPost("/signin", Validate.requestBody(SignInDto))
    async signin(@requestBody() body: SignInDto): Promise<JsonResult> {
        const data = await this._userService.signin(body);

        return this.response(data);
    }
}
