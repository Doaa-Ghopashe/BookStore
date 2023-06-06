import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { DecodetokenService } from 'src/app/services/decodetoken.service';
import { ReservedbooksService } from 'src/app/services/reservedbooks.service';
import { UserbooksService } from 'src/app/services/userbooks.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBookComponent {
  // allratedbooks!:any
  user_id!:string;
  constructor(private reservedBooks:ReservedbooksService,private decodeservice:DecodetokenService,private userbook:UserbooksService,){}
  

  currentContect:any[]=[];
  items: any[]=[]; // your list of items
  currentPage = 1; // start with the first page
  itemsPerPage = 3; // show 5 items per page



getAll(yes:any){

  if(yes == 'all')
  {
    this.currentContect = this.items
  }
  else if(yes == 'read')
  {
    this.currentContect = this.items.filter((book:Book)=>{
      return book['shelve']=='read'
    })
  }
  else if(yes == 'currentReading')
  {
    this.currentContect = this.items.filter((book:Book)=>{
      return book['shelve']=="currently reading"
    })
  }
  else if(yes == 'wantToRead')
  {
    this.currentContect = this.items.filter((book:Book)=>{
      return book['shelve']=="want to read"
    })
  }
}

ngOnInit()
{
  this.user_id = this.decodeservice.getDecodedAccessToken(localStorage.getItem('token')||'')?.['user_id']
  this.reservedBooks.getAllReservedBooks(this.user_id).subscribe((res:any[])=>{
    this.items=res
    this.currentContect = res
  })

}
changestatus(e:any,bookid:string)
{
  this.userbook.checkreservedbooks(e.target.value,bookid,this.user_id)
}
}