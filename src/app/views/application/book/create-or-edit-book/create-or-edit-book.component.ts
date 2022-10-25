import { Component, OnInit } from '@angular/core';
import { AuthorDtoAsKeyValue } from 'src/app/DTOs/author/author-dto-as-key-value'
import { GenreDtoAsKeyValue } from 'src/app/DTOs/Genre/genre-dto-as-key-value'
import { AuthorService } from '../../../../services/author.service';
import { GenreService } from '../../../../services/genre.service';
import { BookService } from '../../../../services/book-service.service';
import { Response } from '../../../../wrappers/response';
import { CreateBookDto } from '../../../../DTOs/Book/create-book-dto';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDtoFromEditBookComponent } from 'src/app/DTOs/Book/book-dto-from-edit-book-component';
import { DatePipe } from '@angular/common';
import { faSave, faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-create-or-edit-book',
  templateUrl: './create-or-edit-book.component.html',
  styleUrls: ['./create-or-edit-book.component.scss']
})

export class CreateOrEditBookComponent implements OnInit {
  faSave=faSave;
  faCircleNotch=faCircleNotch;
  isLoading:boolean=false;
  isSaving:boolean=false;
  // book entity
  public book: CreateBookDto = {
    authorId: '',
    genresIds: [],
    id: '',
    publishedAt: '',
    summary: '',
    title: '',
  };
  // this is used to know if we are on update or create mode. by default is create.
  mode: Action = Action.Create;

  // used for restriction on title field.
  titleMaxLength: number = 50;

  // variable to store all the authors, then we display them on drop down of authors.
  public authors: AuthorDtoAsKeyValue[] = [];

  // variable to store all the genres, then we display them on drop down of genres.
  public genres: GenreDtoAsKeyValue[] = [];

  //variable to store the selected genres for the current book.
  public selectedGenres: GenreDtoAsKeyValue[] = [];

  bookDto?: BookDtoFromEditBookComponent;


  constructor(private authorService: AuthorService,
    private bookService: BookService,
    private genreService: GenreService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = Action.Update;
      this.bookService
        .getBookById(id)
        .subscribe((response: Response<BookDtoFromEditBookComponent>) => {
          if (response.succeeded) {
            this.book = { ...response.data, genresIds: [] };
            this.bookDto = response.data;
            this.selectedGenres = this.genres.filter(genre => response.data.genresIds.map(x => x.genreId).includes(genre.id));
          }
          else {
            this.toastr
              .error('id provided is not valid', 'Ooops', { timeOut: 2000, closeButton: true, progressBar: true })
              .onHidden.subscribe(() => this.router.navigate(['/book/listing']));
          }
        })
    }

    //retriee all the authors
    this.authorService
      .getAuthorsAsKeyValue()
      .subscribe((response: Response<AuthorDtoAsKeyValue[]>) => {
        this.authors = response.data;
      });

    // retrieve all the genres
    this.genreService
      .getGenresAsKeyValue()
      .subscribe((response: Response<GenreDtoAsKeyValue[]>) => {
        this.genres = response.data;
        if (this.mode == Action.Update) {
          this.selectedGenres = this.genres.filter(genre => this.bookDto?.genresIds.map(x => x.genreId).includes(genre.id));
        }
      });
  }

  onSelectGenre(event: any) {
    // add the genre to the selectedGenres of the book.
    this.selectedGenres.push(this.genres.filter(x => x.id == event.target.value)[0]);
  }

  deleteFromSelectedGenres(genreId: string) {
    // remove genre from the selected genres of the book.
    this.selectedGenres = this.selectedGenres.filter(x => x.id !== genreId);
  }

  onSubmit(form: any) {
    this.isSaving=true;
    // select just the ids of the selected genres of the book.
    this.book.genresIds = this.selectedGenres.map((genre) => genre.id);
    if (this.mode == Action.Create) {
      this.bookService
        .createBook(this.book)
        .subscribe((response: any) => {
          this.isSaving=false;
          if (response.succeeded) {
            this.book.id = response.data;
            this.toastr
              .success('the book is created successfully', 'Cool',
                { timeOut: 4000, closeButton: true, progressBar: true })
              .onHidden.subscribe(() =>
                this.router.navigate(['/book/listing']));
          }
          else {
            this.toastr.error('something went wrong!! please check your data.', 'Ooops', { timeOut: 4000, closeButton: true, progressBar: true });
          }

        })
    } else {
      this.bookService
        .updateBook(this.book)
        .subscribe((response: any) => {
          this.isSaving=false;
          if (response.succeeded) {
            this.toastr.success('the book is updated successfully', 'Cool', { timeOut: 4000, closeButton: true, progressBar: true });
          }
          else {
            this.toastr.error('something went wrong!! please check your data.', 'Ooops', { timeOut: 4000, closeButton: true, progressBar: true });
          }
        })
    }
  }

}

enum Action {
  Create,
  Update
}
