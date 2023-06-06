import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { ReviewService } from 'src/app/services/review.service';
import Swiper from 'swiper';
import Typed from 'typed.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _booksevices: BooksService, private _authorsevices: AuthorService,private _reviewSevices: ReviewService)
  {
    this.getPopularBook();
    this.getPopularAuthor();
    this.getPopularReviews();
  }

  books:any[]=[];
  getPopularBook()
  {
    this._booksevices.getBooks().subscribe((res)=>
    {
       this.books= res.data.book
       console.log(this.books)
    })
  }


  author:any[]=[];
  getPopularAuthor()
  {
    this._authorsevices.getAuthor().subscribe((res)=>
    {
       this.author= res
       console.log(this.author)
    })
  }



  reviwes:any[]=[];
  getPopularReviews()
  {
    this._reviewSevices.getAllReviews().subscribe((res)=>
    {
       this.reviwes= res
       console.log(this.reviwes)
    })
  }



  ngOnInit() {

    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      typeSpeed: 50,
      backSpeed: 50,
      loop:true,
      loopCount: Infinity,
    });
    
  }



  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplaySpeed:100,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
     nav: false
  }



}
