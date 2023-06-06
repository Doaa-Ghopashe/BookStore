import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book';
import { BooksService } from './books.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AvgrateService {
  //some variables
  private rate_list = new BehaviorSubject([]);
  pubRateList = this.rate_list.asObservable();
  private readers_count = new BehaviorSubject(0); //number of records of the same book
  pubReadersCount = this.readers_count.asObservable();
  private avg_rate = new BehaviorSubject(0); //**still have no idea if i leave it or not
  pubAvgRateVal = this.avg_rate.asObservable();
  private book = new BehaviorSubject({}); // to got specific book
  pubBook = this.book.asObservable();

  bookdata!:Book;
  book_id!:string;
  counter: number = 0;
  totalrate: number = 0;

  //constructor
  constructor(private _http: HttpClient, private bookservice: BooksService,private activatedroute:ActivatedRoute) {
    this.reloadData()
  }

  //to count the average rate we have to know the book id
  countAvgRate(book_id:string) {

    //reload the data from the rate model
    this.reloadData();

    //here we got the book to assign the avgrate to after we finish the function
    
    this.bookservice.getSpecificBook(book_id).subscribe((res: any) => {
      this.book.next(res)
    })

    //we need to search for the book in the booklist 
    this.pubRateList.subscribe((res) => {

      //
      this.counter = 0;
      this.totalrate = 0;
      res.filter((result) => {
        
        //check if this book exist on the list
        if (result['book_id'] === book_id) {
          //here we add all rates value in the total rate var
          this.totalrate += result['rate_val'];

          this.readers_count.next(++this.counter)
        }
        
        //we count the average by dividing the total rate on the total records and assign it to the var avgrate
        this.avg_rate.next(Math.round(this.totalrate / (this.readers_count.value == 0 ? 1 : this.readers_count.value)))
        
        //store the result on book model specifically on the avgRating property
        this.book.subscribe((res: any) => res.avgRating = this.avg_rate )

        //store the avgrate in the book model in the database
        this._http.put(`http://localhost:5000/book/${book_id}`,{avgRating:this.avg_rate.value}).subscribe();
        
      })
    })
    return this.pubAvgRateVal
  }

  //reload data from the rate model
  reloadData(){
    //at the begin we need to get all rated books
    this._http.get('http://localhost:5000/rate').subscribe((res: any) => this.rate_list.next(res));
  }
  getAvgRate() {
    return this.pubAvgRateVal
  }
}