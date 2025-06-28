export interface CustomHttpResponse {
    httpStatusCode: number; // 200,201, 400, 500
    httpStatus: string;
    reason: string;
    message: string;
}