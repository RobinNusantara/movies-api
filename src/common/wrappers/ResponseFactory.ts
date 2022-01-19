/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpStatus } from "@apps/common/enums/HttpStatusEnum";

export class ResponseFactory {
    public static successResponse(
        status: HttpStatus,
        data: any,
    ): ResponseFactory {
        return {
            success: true,
            error: null,
            results: {
                status,
                data,
            },
        };
    }

    public static errorResponse(
        status: HttpStatus,
        messages: any,
    ): ResponseFactory {
        return {
            success: false,
            error: {
                status,
                messages,
            },
            results: null,
        };
    }
}
