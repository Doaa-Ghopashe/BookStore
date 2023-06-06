import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { AvgrateService } from 'src/app/services/avgrate.service';
import { UserbooksService } from 'src/app/services/userbooks.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent {
  books!:Book[];
  author_id!:string;
  user_id!:string;
  @Input() book_id!:string;
  url:string = 'http://localhost:5000/book';
  avgrate!:number;
  constructor(private _http:HttpClient,private activatedroute:ActivatedRoute,private avgrateservice:AvgrateService,private userbook:UserbooksService,){}

  ngOnInit(){
    //set the authorid
    this.author_id = this.activatedroute.snapshot.params['id'];
    //we got all books
    this._http.get(this.url).subscribe((res:any) =>{
      this.books = res['data']['book'].filter((result:any)=>{
        return result.AuthorId["_id"]==this.author_id
      })
    })

  }
}
