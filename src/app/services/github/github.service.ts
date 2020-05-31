import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private _baseUrl = environment.baseUrl;
  private _httpOptions = {
    headers: new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private _http: HttpClient) {}

  public getGithubTeams() {
    return this._http.get(`${this._baseUrl}github/user-projects`, this._httpOptions);
  }
}
