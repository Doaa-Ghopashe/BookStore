import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Author } from '../interfaces/author';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
allAuthors!:Author[];
private Author = new BehaviorSubject({});
PubAuthor = this.Author.asObservable()
  constructor(private _httpClinet:HttpClient) { }

  getAuthor(): Observable <any>{
  return  this._httpClinet.get('http://localhost:5000/authors')
  }

  deleteAuthor(id:any):Observable<any>{
    return this._httpClinet.delete(`http://localhost:5000/authors/${id}`)
   }

   addAuthor(categoryData:any):Observable<any>{
    return this._httpClinet.post(`http://localhost:5000/authors`,categoryData)
   }

   updateAuthor(id:any,newData:any):Observable<any>{
    return this._httpClinet.put(`http://localhost:5000/authors/${id}`,newData)
   }

   loadSpecificAuthor(_id:string){
     this._httpClinet.get(`http://localhost:5000/authors/${_id}`).subscribe((res:any)=>{
       this.Author.next(res)
     })
     
   }
   getSpecificAuthor(){
     return this.PubAuthor
   }

}