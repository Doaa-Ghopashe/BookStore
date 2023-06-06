import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rate } from 'src/app/interfaces/rate';
import { AvgrateService } from 'src/app/services/avgrate.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})

export class RateComponent {
  //some variables
  book_id!: string;
  token_info!: any;
  user_id!: string;
  user_review!:any;
  url: string = 'http://localhost:5000/rate';
  ratingcontrol = new FormControl(0);
  rated_book!: any;
  all_rated_books!: Rate[];

  //constructor with all services we need
  constructor(private _http: HttpClient, private rateservice: AvgrateService, private activetedrouter: ActivatedRoute) { }

  //start loading all data we need 
  ngOnInit() {
    this.book_id = this.activetedrouter.snapshot.params['id'];
    this.token_info = this.getDecodedAccessToken(localStorage.getItem('token') || '');
    this.user_id = this.token_info?.['user_id']

    //here we got all rated books from rate model
    this._http.get('http://localhost:5000/rate').subscribe((res: any) => {
      this.all_rated_books = res;
      this.ratingcontrol.setValue(res.filter((res:any)=>{
        return res.user_id == this.user_id && res.book_id == this.book_id
      })[0]['rate_val'])
    })
  }

  //to decode the returned token
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  //
  addStar() {
    //we need to check if the returned ratedbooks array has any data
    if (this.all_rated_books.length) {
      //so if ratedbooks has data we just need to filter this data to get a specific bbok
      this.rated_book = this.all_rated_books.filter((result) =>
        result['book_id'] == this.book_id && result['user_id'] == this.user_id
      )
      //then we need to check if we have the filteration result or not 
      if (this.rated_book.length != 0) {
        //assign the stars to the returned rated book and resend it to the back to be stored in the model
        this.rated_book[0].rate_val = this.ratingcontrol.value;

        this._http.put(this.url + `/${this.rated_book[0]['_id']}`, this.rated_book[0]).subscribe();

        //after finishing the update operation so we need to rerun the avgrate function to be counted again
        this.rateservice.countAvgRate(this.book_id).subscribe()
      } else {
        //else their is no returned book so we need to create a new record with the userid and bookid
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

        this._http.post(this.url, JSON.stringify({
          rate_val: this.ratingcontrol.value,
          book_id: this.book_id, user_id: this.user_id
        }), {
          headers: headers
        }).subscribe();

        //after all we need to count again the avgrate
        this.rateservice.countAvgRate(this.book_id).subscribe()
      }
    } else {
      //in case their is no data in the data model so we need to start putting data
      const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        
      this._http.post(this.url, JSON.stringify({ rate_val: this.ratingcontrol.value, book_id: this.book_id, user_id: this.user_id }), {
        headers: headers
      }).subscribe();

      //again we need to count the avgrate
      this.rateservice.countAvgRate(this.book_id).subscribe()
    }
  }
}