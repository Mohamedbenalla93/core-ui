import { AuthorDtoFromBookListingComponent } from "../author/author-dto-from-book-listing-component";
import { BookGenresDtoFromBookListingcomponent } from "../book-genres/book-genres-dto-from-book-listing-component";

export interface BookDtoFromBookListingComponent{
    id: string;
    title:string;
    publishedAt:Date;
    author: AuthorDtoFromBookListingComponent;
    bookGenres : BookGenresDtoFromBookListingcomponent[];
    genres:string;
    numberOfPages : number;
    publishedAtFormted:string | null;
    checked:boolean;
    index:number;
}
