// Import Dependencies
import { injectable } from "inversify";

// Import Applications
import { IRepository } from "@apps/common/interfaces/RepositoryInterface";
import { PasswordEncryption } from "@apps/common/utils/PasswordEncryption";
import { SignUpDto } from "@apps/dtos/AuthDto";
import { UserModel } from "@apps/models/UserModel";

@injectable()
export class UserRepository implements IRepository<UserModel> {
    async insert(params: { model: SignUpDto }): Promise<UserModel> {
        const { model } = params;

        const password = await PasswordEncryption.encryptPassword(
            model.password,
        );

        const user = new UserModel();

        user.name = model.username;
        user.password = password;

        return await user.save();
    }

    async indexes(): Promise<Array<UserModel>> {
        throw new Error("Method not implemented.");
    }

    async index(params: { username: string }): Promise<UserModel | null> {
        const { username } = params;

        const user = await UserModel.findOne({
            where: {
                name: username,
            },
        });

        return user;
    }

    update(): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
