import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { handleServiceResponse } from "@common/utils/httpHandlers";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


function authorizeAdmin(req: Request, res: Response, next: NextFunction): void {
    const role = req.token?.payload?.role; 

    if (role !== "ADMIN") {
        handleServiceResponse(
            new ServiceResponse(
                ResponseStatus.Failed,
                "Forbidden: Admins only",
                null,
                StatusCodes.FORBIDDEN
            ),
            res
        );
        return;
    }

    next();
}

export default authorizeAdmin;