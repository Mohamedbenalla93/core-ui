export interface Response<T> {
    data: T;
    succeeded: boolean;
    message: string;
    errors:string[];
}
