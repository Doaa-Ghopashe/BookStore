import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from  'jwt-decode';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() review!: string
  book_id!:string;
  user_id!:string;
  token_info!:any;
  constructor(private http: HttpClient, private reviewService: ReviewService,private activedrouter : ActivatedRoute) { }

  ngOnInit() {
    this.book_id = this.activedrouter.snapshot.params['id'];
    this.token_info = this.getDecodedAccessToken(localStorage.getItem('token') || '');
    this.user_id = this.token_info?.['user_id']
  }

  //to decode the returned token
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  sendReview(e: any) {
    //here the event should be stopped
    e.preventDefault();
    //check if the textarea contains a value
    if (this.review != '') {
      const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
      //send the review to be stored in the backend
      this.http.post('http://localhost:5000/review', JSON.stringify({ review: this.review, book_id: this.book_id, user_id: this.user_id }), {
        headers: headers
      }).subscribe()

      this.reviewService.setReviews()

      this.review = '';
    }

  }

}
