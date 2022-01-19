import { genSalt, compare, hash } from "bcryptjs";

export class PasswordEncryption {
    public static async encryptPassword(password: string): Promise<string> {
        const salted: string = await genSalt(10);

        const hashed: string = await hash(password, salted);

        return hashed;
    }

    public static async comparePassword(
        reqestPassword: string,
        storePassword: string,
    ): Promise<boolean> {
        const validatedPassword = await compare(reqestPassword, storePassword);

        return validatedPassword;
    }
}
