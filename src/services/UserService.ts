// Import Dependencies
import { injectable } from "inversify";
import { Conflict, Forbidden } from "http-errors";

// Import Applications
import { SignUpDto, SignInDto } from "@apps/dtos/AuthDto";
import { UserRepository } from "@apps/repositories/UserRepository";
import { AccessToken } from "@apps/common/utils/AccessToken";
import { PasswordEncryption } from "@apps/common/utils/PasswordEncryption";

@injectable()
export class UserService {
    constructor(private readonly _userRepository: UserRepository) {}

    async signup(body: SignUpDto): Promise<string> {
        const isUsernameExists = await this._userRepository.index({
            username: body.username,
        });

        if (isUsernameExists) {
            throw new Conflict("Username already taken");
        }

        const user = await this._userRepository.insert({ model: body });

        return AccessToken.generateToken(Number(user.id), user.name);
    }

    async signin(body: SignInDto): Promise<string> {
        const user = await this._userRepository.index({
            username: body.username,
        });

        if (!user) {
            throw new Forbidden("Username or password is incorrect");
        }

        const password = await PasswordEncryption.comparePassword(
            body.password,
            user.password,
        );

        if (!password) {
            throw new Forbidden("Username or password is incorrect");
        }

        return AccessToken.generateToken(Number(user.id), user.name);
    }
}
