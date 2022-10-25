import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  SharedModule
} from '@coreui/angular';
import { BookListingComponent } from '../book-listing/book-listing.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CreateOrEditBookComponent } from '../create-or-edit-book/create-or-edit-book.component';
@NgModule({
  declarations: [
    BookListingComponent,
    CreateOrEditBookComponent,

  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    InfiniteScrollModule,
    BadgeModule,
    ToastrModule.forRoot(), // ToastrModule added
    FontAwesomeModule,
    ModalModule,
  ]
})
export class BookModule { }
