import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ BookListingComponent} from '../book-listing/book-listing.component';
import { CreateOrEditBookComponent } from '../create-or-edit-book/create-or-edit-book.component';
const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Book'
      },
      children: [

        {
          path: 'listing',
          component: BookListingComponent,
          data: {
            title: 'listing'
          }
        },
        {
          path: 'create',
          component: CreateOrEditBookComponent,
          data: {
            title: 'create book'
          }
        },
        {
          path: ':id',
          component: CreateOrEditBookComponent,
          data: {
            title: 'update book'
          }
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo:'listing'
        }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BookRoutingModule { }
