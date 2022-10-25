import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import{AuthorDtoAsKeyValue} from '../DTOs/author/author-dto-as-key-value';
import { Response } from '../wrappers/response';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = '';

  constructor(private httpService: HttpClient) {

    this.url = `${environment.backend_URL}/author`;
  }

  getAuthorsAsKeyValue(){
    return this.httpService
    .get(`${this.url}/get-authors-as-key-value`) as Observable<Response<AuthorDtoAsKeyValue[]>>;
  }
}
