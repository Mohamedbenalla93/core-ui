import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faRemove, faSearch,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BookDtoFromBookListingComponent } from '../../../../DTOs/Book/book-dto-from-book-listing-component';
import { GetBookFromBookListingViewModel } from '../../../../DTOs/Book/get-book-from-book-listing-component-view-model';
import { BookFilterValues, BookService } from '../../../../services/book-service.service';
@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent implements OnInit {
  plusIcon = faPlus;
  faEdit = faEdit;
  faRemove = faRemove;
  faSearch = faSearch;
  faCircleNotch=faSpinner;

  pageNumber: number = 1;
  pageSize: number = 20;
  filter: BookFilterValues = {
    authorFirstname: '',
    authorLastname: '',
    publishedAtFrom: '',
    publishedAtTo: '',
    title: ''
  };

  books: BookDtoFromBookListingComponent[] = [];
  totalCount: number = 0;
  isLoading: boolean = false;
  constructor(private bookService: BookService,
    private datePipe: DatePipe,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._getBooks(false);
  }

  _getBooks(isFilter: boolean = false) {
    this.bookService
      .getBooks(this.pageNumber, this.pageSize, this.filter)
      .subscribe((viewModel: GetBookFromBookListingViewModel) => {
        const _books = viewModel.data.map(book => {
          book.genres = book.bookGenres.map(genre => genre.genre.name).join(', ');
          book.publishedAtFormted = this.datePipe.transform(book.publishedAt, "dd/MM/yyyy");
          book.checked = false;
          return book;
        });
        if (isFilter) {
          this.books = _books;
        }
        else {
          this.books.push(..._books);
        }

        this.totalCount = viewModel.totalCount;
      });
  }
  onScroll(): void {
    this.pageNumber = this.pageNumber + 1;
    this._getBooks(false);
  }

  toggleCheckBook(id: string) {
    var index = this.books.findIndex(x => x.id == id);
    if (this.books[index].checked)
      this.books[index].checked = false;
    else
      this.books[index].checked = true;
  }
  checkAllBooks($event: any) {
    if ($event.target.checked == true) {
      this.books = this.books.map(book => {
        book.checked = true;
        return book;
      });
    }
    else {
      this.books = this.books.map(book => {
        book.checked = false;
        return book;
      });
    }
  }

  search() {
    this.pageNumber = 1;
    this._getBooks(true);
  }
  deleteSelectedBooks() {
    var ids = this.books.filter(x => x.checked === true).map(x => {
      return x.id
    });
    if (ids.length === 0) {
      this.toastr.warning(`You didn't choose any book`, 'Oooops!', { closeButton: true, progressBar: true, timeOut: 2000 });
    }
    else
      this.deleteBooks(ids);
  }
  deleteBooks(ids: string[]) {
    this.isLoading = true;

    this.bookService
      .deleteBooks(ids)
      .subscribe((resposne: any) => {
        this.isLoading = false;
        if (resposne.succeeded) {
          this.toastr.success(`${resposne.data} book(s) are deleted successfully`, 'Cool', { closeButton: true, progressBar: true, timeOut: 2000 });
          this.books = this.books.filter(x => !ids.includes(x.id));
        }
        else {
          this.toastr.error(`Ooops!! something went wrong`, 'Oooops!', { closeButton: true, progressBar: true, timeOut: 2000 });
        }
      });
  }

  deleteBook(id: string) {
    this.deleteBooks([id]);
  }

}
