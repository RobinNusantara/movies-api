/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Import Dependencies
import { Request, Response, NextFunction } from "express";
import { Forbidden, Unauthorized } from "http-errors";
import { interfaces } from "inversify-express-utils";
import { verify } from "jsonwebtoken";

// Import Applications
import { config } from "@apps/common/config/Config";

export class Authentication {
    public static verify() {
        return (req: Request, res: Response, next: NextFunction) => {
            const { jwt } = config;

            const authorization = req.headers["authorization"];
            const token = authorization && authorization.split(" ")[1];

            if (!token) throw new Unauthorized();

            verify(token, jwt.signature, (err: any, user: any) => {
                if (err) throw new Forbidden();

                const httpContext: interfaces.HttpContext = Reflect.getMetadata(
                    "inversify-express-utils:httpcontext",
                    req,
                );

                httpContext.user.details = user;
                req.user = user;
                next();
            });
        };
    }
}
