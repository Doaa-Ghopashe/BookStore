import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { ReviewService } from 'src/app/services/review.service';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() reviewslist!: Review[];
  bookid!: string;
  userid!: string;
  username!: string;
  token_info!: any;
  constructor(private reviewService: ReviewService, private activatedrouter: ActivatedRoute,private _httpClient:HttpClient) { }
  ngOnInit() {
    this.bookid = this.activatedrouter.snapshot.params['id']
    this.reviewService.getReviews().subscribe((res: any) => {
      this.reviewslist = res.filter((result: any) => {
        
        return result['book_id'] == this.bookid
      })
    })
  }
}
