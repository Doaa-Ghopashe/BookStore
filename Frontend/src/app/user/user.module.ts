import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { UserBookComponent } from './user-books/user-books.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UserAccountComponent,
    UserReviewsComponent,
    UserBookComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  exports:[
    UserAccountComponent,
    UserReviewsComponent,
    UserBookComponent
  ]
})
export class UserModule { }
