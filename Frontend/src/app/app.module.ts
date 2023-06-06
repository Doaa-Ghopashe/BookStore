import { SearchPipe } from './pipes/search.pipe';

//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { BooksModule } from './books/books.module';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TagsContainerComponent } from './components/tags-container/tags-container.component';
import { AdminDahboardComponent } from './admin/admin-dahboard/admin-dahboard.component';
import { CategoeyForAdminComponent } from './admin/categoey-for-admin/categoey-for-admin.component';
import { BookForAdminComponent } from './admin/book-for-admin/book-for-admin.component';
import { AuthorForAdminComponent } from './admin/author-for-admin/author-for-admin.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TagsContainerComponent,
    SearchPipe,
    AdminDahboardComponent,
    CategoeyForAdminComponent,
    BookForAdminComponent,
    AuthorForAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxPaginationModule,
    AuthorModule,
    UserModule,
    SharedModule,
    BooksModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
