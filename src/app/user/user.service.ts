import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../auth/token.storage';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();

  getUsers(): Observable <any> {
    return Observable.create(observer => {
      this.http.get(environment.endPoint + 'user')
      .subscribe((data: any) => {
          observer.next({usersList: data});
          observer.complete();
      });
    });
  }
}
