import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { AuthorService } from 'src/app/services/author.service';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
allAuthors!:Author[];
currentPage = 1; // start with the first page
  itemsPerPage = 5; // show 5 items per page
constructor(private _AuthorService:AuthorService,private _route:Router){
this._AuthorService.getAuthor().subscribe((res)=>{
this.allAuthors=res
console.log(res);

})
}
showauthordetails(_id:any)
{
  console.log(_id?.['_id'])
  this._route.navigateByUrl(`/authorDetails/${_id}`)
}
}