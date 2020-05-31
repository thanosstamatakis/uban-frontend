import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  public async getUserByName(username) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      params: {
        user: username,
      },
    };
    let userPromise = this._http.get(`${this.baseUrl}users/name/`, httpOptions).toPromise();
    let user = await Promise.resolve(userPromise);
    return user;
  }
}
