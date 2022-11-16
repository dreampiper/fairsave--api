import { Response } from "express";
interface IResponseHandler {
    res: Response;
    status: number;
    data: any;
}
declare function responseHandler({ res, status, data }: IResponseHandler): void;
export default responseHandler;
