
const isDebugMode = true;

export class ApiResponse {
    static handler<T>(input: IAPIResponse<T>): IAPIResponse<any> {

        return (!isDebugMode) ? {
            data: input.data,
            status: input.status
        } : {
            data: input.data,
            status: input.status,
            error: input.error || { message: 'Success \o/ !!!' }
        }
    }
}

export interface IAPIResponse<T> {
    status: IStatusMessage;
    data?: T;
    error?: IErrorMessage;
}

export interface IStatusMessage {
    statusCode: number;
    message: string;
}

export interface IErrorMessage {
    message: string;
    context?: {
        input?: any,
        output?: {
            className?: string;
            methodName?: string;
            objectErro?: object;
        };
    };
}
