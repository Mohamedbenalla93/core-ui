import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Response } from '../wrappers/response';
import{GetBookFromBookListingViewModel} from '../DTOs/Book/get-book-from-book-listing-component-view-model';
import { CreateBookDto } from '../DTOs/Book/create-book-dto';
import {BookDtoFromEditBookComponent} from '../DTOs/Book/book-dto-from-edit-book-component'
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url: string = '';

  constructor(private httpService: HttpClient) {

    this.url = `${environment.backend_URL}/book`;

  }

  getBooks( pageNumber: number, pageSize: number,filter?: BookFilterValues) {
    const params = {
      ...filter,
      PageNumber: pageNumber,
      PageSize: pageSize
    }
    return this.httpService.get(`${this.url}/get-books`, { params }) as Observable<GetBookFromBookListingViewModel>;
  }

  createBook(book: CreateBookDto){
    return this.httpService.post(this.url, book) as Observable<any>;
  }

  updateBook(book: CreateBookDto){
    return this.httpService.put(this.url,book) as Observable<any>
  }

  getBookById(id:string){
    const params = {
      id:id
    }
    return this.httpService.get(`${this.url}/get-book-by-id`,{params}) as Observable<Response<BookDtoFromEditBookComponent>>;
  }

  deleteBooks(ids:string[]){
    return this.httpService.delete(`${this.url}`,{body:ids}) as Observable<Response<number>>;
  }
}

export interface BookFilterValues {
  title?: string;
  authorFirstname?: string;
  authorLastname?: string;
  publishedAtFrom?: string;
  publishedAtTo?: string;
}
