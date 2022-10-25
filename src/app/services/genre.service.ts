import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import{GenreDtoAsKeyValue} from '../DTOs/Genre/genre-dto-as-key-value';
import { Response } from '../wrappers/response';
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url: string = '';

  constructor(private httpService: HttpClient) {

    this.url = `${environment.backend_URL}/genre`;
  }

  getGenresAsKeyValue(){
    return this.httpService
    .get(`${this.url}/get-genres-as-key-value`) as Observable<Response<GenreDtoAsKeyValue[]>>;
  }
}
