import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CatrgoriesComponent } from './catrgories/catrgories.component';
import { PostComponent } from './post/post.component';
import { RateComponent } from './rate/rate.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

import { HttpClientModule } from '@angular/common/http';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  declarations: [
    BooksComponent,
    BookDetailsComponent,
    CategoryDetailsComponent,
    CatrgoriesComponent,
    PostComponent,
    RateComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxPaginationModule
  ],
  exports:[
    BooksComponent,
    BookDetailsComponent,
    CategoryDetailsComponent,
    CatrgoriesComponent,
    PostComponent,
    RateComponent,
    ReviewsComponent
  ]
})
export class BooksModule { }
