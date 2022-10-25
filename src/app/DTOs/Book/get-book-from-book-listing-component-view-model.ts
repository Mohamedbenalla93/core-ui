import { PagedReponse } from "../../wrappers/paged-response";
import {BookDtoFromBookListingComponent} from "./book-dto-from-book-listing-component";

export interface GetBookFromBookListingViewModel extends PagedReponse<BookDtoFromBookListingComponent[]>{
    totalCount:number;
}