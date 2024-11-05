import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { env } from "@common/utils/envConfig";
import { handleServiceResponse } from "@common/utils/httpHandlers";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            token?: any; 
        }
    }
}

function authenticateToken(req: Request, res: Response, next: NextFunction): void  {
    const token = req.cookies.token;
    let jwtPayload;
    if (!token) {
        handleServiceResponse(
            new ServiceResponse(
            ResponseStatus.Failed,
            "Authentication failed",
            null,
            StatusCodes.UNAUTHORIZED
            ),
            res
        );
        return;
    }
    try {
        jwtPayload = <any>verify(token, env.JWT_SECRET, {
            complete: true,
            algorithms: ["HS256"],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false,
        }) as any;
        req.token = jwtPayload;
      
    } catch (error) {
        handleServiceResponse(
            new ServiceResponse(
                ResponseStatus.Failed,
                "Token is not valid",
                null,
                StatusCodes.FORBIDDEN
            ),
            res
        );
        return;
    }
    next();
}
  
export default authenticateToken;
  