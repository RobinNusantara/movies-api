// Import Dependencies
import { sign } from "jsonwebtoken";

// Import Applications
import { config } from "@apps/common/config/Config";
import { IJwtPayload } from "@apps/common/interfaces/JwtPayloadInterface";

export class AccessToken {
    public static generateToken(id: number, username: string): string {
        const payload: IJwtPayload = {
            id,
            username,
        };

        const { jwt } = config;

        const token = sign(payload, jwt.signature, {
            expiresIn: "24h",
        });

        return token;
    }
}
