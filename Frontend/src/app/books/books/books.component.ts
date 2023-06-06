import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  allBooks:any[]=[];
  currentPage = 1; // start with the first page
  itemsPerPage = 8; // show 5 items per page
prex='http://localhost:5000';
img!:any[];
  constructor(private _booksService:BooksService, private _route:Router){
    _booksService.getBooks().subscribe((res)=>{
      this.allBooks=res.data.book
      console.log(this.allBooks);
      
      // this.img=this.allBooks.photo
    })
   console.log(this.allBooks);
  }

ngOnInit() {
  // console.log(data);

}

getBookDetails(id:any)
{
  this._route.navigateByUrl(`/bookDetails/${id}`)
}
}