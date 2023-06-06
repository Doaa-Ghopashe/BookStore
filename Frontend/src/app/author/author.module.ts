import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WorksComponent } from './works/works.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BooksModule } from '../books/books.module';
import { RateComponent } from '../books/rate/rate.component';
@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorDetailsComponent,
    WorksComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BooksModule
  ],
  exports:[
    AuthorDetailsComponent,
    AuthorsComponent
  ]
})
export class AuthorModule { }
