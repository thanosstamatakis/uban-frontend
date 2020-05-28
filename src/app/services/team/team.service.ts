import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  // Declarations
  private _httpOptions = {
    headers: new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  //Function that calls the api to add a new team
  addNewTeam(payload: Object) {
    return this._http.post(`${this._baseUrl}teams`, payload, this._httpOptions);
  }

  getUserTeams() {
    return this._http.get(`${this._baseUrl}teams/user`, this._httpOptions);
  }

  //Function that calls the api to get all teams for specific user
  getAllTeams() {
    return this._http.get(`${this._baseUrl}teams/all`, this._httpOptions);
  }
}
