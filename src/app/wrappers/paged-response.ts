export interface PagedReponse<T> {
    pageNumber: number;
    pageSize: number;
    data: T;
}