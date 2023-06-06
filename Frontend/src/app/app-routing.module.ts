import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CatrgoriesComponent } from './books/catrgories/catrgories.component';
import { BooksComponent } from './books/books/books.component';
import { AuthorsComponent } from './author/authors/authors.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { UserBookComponent } from './user/user-books/user-books.component';
import { AuthService } from './services/auth.service';
import { AboutComponent } from './shared/about/about.component';
import { ContactComponent } from './shared/contact/contact.component';
import { CategoryDetailsComponent } from './books/category-details/category-details.component';
import { AdminDahboardComponent } from './admin/admin-dahboard/admin-dahboard.component';
import { CategoeyForAdminComponent } from './admin/categoey-for-admin/categoey-for-admin.component';
import { BookForAdminComponent } from './admin/book-for-admin/book-for-admin.component';
import { AuthorForAdminComponent } from './admin/author-for-admin/author-for-admin.component';
import { AuthorDetailsComponent } from './author/author-details/author-details.component';

const routes: Routes = [
  {path : "", redirectTo:"home", pathMatch : "full"},
  {path : "home", component : HomeComponent},
  {path : "user/register", component : RegistrationComponent},
  {path : "user/login", component : LoginComponent},
  {path : "categories", component : CatrgoriesComponent,canActivate:[AuthService]},
  {path : "books", component : BooksComponent,canActivate:[AuthService]},
  {path : "authors", component : AuthorsComponent,canActivate:[AuthService]},
  {path : "book/:id", component : BookDetailsComponent , canActivate:[AuthService]},
  {path : "mybook", component : UserBookComponent,canActivate:[AuthService]},
  {path : "mybook/read", component : UserBookComponent,canActivate:[AuthService]},
  {path : "about", component : AboutComponent},
  {path : "contact", component : ContactComponent},

  {path : "categoryDetails/:id", component : CategoryDetailsComponent, canActivate:[AuthService]},
  {path : "admin", component : AdminDahboardComponent, canActivate:[AuthService]},
  {path : "admin/category", component : CategoeyForAdminComponent, canActivate:[AuthService]},
  {path : "admin/book", component : BookForAdminComponent, canActivate:[AuthService]},
  {path : "admin/authors", component : AuthorForAdminComponent, canActivate:[AuthService]},
  {path: "bookDetails/:id" ,component: BookDetailsComponent, canActivate:[AuthService]},
  {path: "authorDetails/:id" ,component: AuthorDetailsComponent, canActivate:[AuthService]},
  {path : "**", component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
