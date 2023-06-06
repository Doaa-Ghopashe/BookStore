import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
allCategories:any[]=[];

private Category = new BehaviorSubject('');
pubCategory = this.Category.asObservable();
  constructor(private _httpClinent:HttpClient) {}

  getCategory():Observable <any>{

   return this._httpClinent.get('http://localhost:5000/category')

  }

  deleteCategory(id:any):Observable<any>{
    return this._httpClinent.delete(`http://localhost:5000/category/${id}`)
   }

   addCategry(categoryData:any):Observable<any>{
    return this._httpClinent.post(`http://localhost:5000/category`,categoryData)
   }

   updateCategory(id:any,newData:any):Observable<any>{
    return this._httpClinent.put(`http://localhost:5000/category/${id}`,newData)
   }
   loadSpecificCategory(_id:string){
    this._httpClinent.get(`http://localhost:5000/category/${_id}`).subscribe((res:any)=>{
      this.Category.next(res)
    })
    
  }
  getSpecificCategory(){
    return this.pubCategory
  }
}