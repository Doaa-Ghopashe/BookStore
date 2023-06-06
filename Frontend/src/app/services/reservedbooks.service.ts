import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservedbooksService {
  allreseveredbooks = new BehaviorSubject([]);
  puballreservedbooks = this.allreseveredbooks.asObservable()
  reservedbookstatus = new BehaviorSubject(' ');
  pubReservedBookStatus = this.reservedbookstatus.asObservable();
  constructor(private _http: HttpClient) { }
  getResevedBooks(book_id: string, user_id: string) {
    //return status
    this._http.get('http://localhost:5000/reservebook').subscribe((res: any) => {
      //filteration on the book
      this.reservedbookstatus.next(res.filter((result: any) => {
        return result.book_id['_id'] === book_id && result.user_id === user_id
      })?.[0]?.['shelve'])
    })
    return this.pubReservedBookStatus;
  }


  getAllReservedBooks(userId: string) {
    this._http.get('http://localhost:5000/reservebook').subscribe((reservedBooks: any) => {

      this.allreseveredbooks.next(reservedBooks.filter((reservedBook: any) => {
        return reservedBook.user_id == userId
      }))
    });
    return this.allreseveredbooks
  }

}
