import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../interfaces/book';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  allBooks!:Book[];
  private book = new BehaviorSubject({});
  private bookList = new BehaviorSubject<Array<Book>>([]);
  private bookauthor = new BehaviorSubject('');
  private bookcategory = new BehaviorSubject('');

  pubBook = this.book.asObservable();
  pubBookList = this.bookList.asObservable();
  pubBookAuthor = this.bookauthor.asObservable();
  pubBookCategory = this.bookcategory.asObservable();

  constructor(private _httpClinet:HttpClient) { }
  // getBooks():Observable<any>{
    //  this._httpClinet.get('http://localhost:5000/book').subscribe((res:any)=>{
    //   // console.log(res);
    //   this.allBooks=res
    //   return res
    //  });
    
  getBooks():Observable<any>{
    return  this._httpClinet.get('http://localhost:5000/book')
   }
 
   deleteBook(id:any):Observable<any>{
     return this._httpClinet.delete(`http://localhost:5000/book/${id}`)
    }
 
    addBook(bookData:any):Observable<any>{
     return this._httpClinet.post(`http://localhost:5000/book`,bookData)
    }
 
    updateBook(id:any,newData:any):Observable<any>{
     return this._httpClinet.put(`http://localhost:5000/book/${id}`,newData)
    }
 

  loadBooks(): void {
    this._httpClinet.get('http://localhost:5000/book').
    subscribe((res: any) => this.bookList.next(res.data.book));
  }
  getSpecificBook(_id: string): any {
    this._httpClinet.get(`http://localhost:5000/book/${_id}`).
    subscribe((res: any) => {
      this.book.next(res.data.book[0]);
      this.bookauthor.next(res.data.book[0].AuthorId);
      this.bookcategory.next(res.data.book[0].categoryId);
    })
    return this.pubBook
  }

  // getAuthorId(){
  //   return this.pubBookAuthor
  // }
  getCategoryId(){
    return this.pubBookCategory
  }

}