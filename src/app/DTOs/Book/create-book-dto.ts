
import{BookGenresDtoFromEditBookComponent} from '../book-genres/book-genres-dto-from-edit-book-component'
export interface CreateBookDto{
  id:string;
  title:string;
  summary:string;
  publishedAt:string;
  numberOfPages?:number;
  authorId:string;
  genresIds:string[];
}
