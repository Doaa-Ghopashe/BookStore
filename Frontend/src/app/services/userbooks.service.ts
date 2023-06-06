import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, concatAll } from 'rxjs';
// import { faL } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class UserbooksService {

  private ratedbookid = new BehaviorSubject('');
  pubRatedBookId = this.ratedbookid.asObservable()

  constructor(private http: HttpClient) { }


  checkreservedbooks(status: string, id: string, user_id: string) {
    let exist = false
    this.http.get('http://localhost:5000/reservebook').subscribe((res: any) => {

      res.filter((result: any) => {
        if (result.user_id == user_id && result.book_id._id == id) {
          result['shelve'] = status
          this.http.put(`http://localhost:5000/reservebook/${result['_id']}`, result).subscribe()
          exist = true;
        }
      })
      if (exist == false) {
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
        this.http.post('http://localhost:5000/reservebook', JSON.stringify({ book_id: id, user_id: user_id, shelve: status }),
          {
            headers
          }).subscribe()
      }

    })
  }

}
