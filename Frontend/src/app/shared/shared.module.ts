import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NotFoundComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent
  ]
})
export class SharedModule { }
