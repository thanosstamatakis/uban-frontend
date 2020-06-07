import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Declarations
  private _httpOptions = {
    headers: new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getUnreadMessages(userId) {
    return this._http.get(`${this._baseUrl}messages/unread/${userId}`, this._httpOptions);
  }
}
