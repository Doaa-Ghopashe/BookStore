import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews = new BehaviorSubject([])

  reviewslist = this.reviews.asObservable()

  constructor(private http:HttpClient){ this.setReviews() }
  
  getReviews(){
    return this.reviews
  }

  setReviews(){
    this.http.get('http://localhost:5000/review').subscribe((res:any)=>
      this.reviews.next(res)
    )
  }

  getAllReviews():Observable<any>
  {
     return this.http.get('http://localhost:5000/review')
   }
}