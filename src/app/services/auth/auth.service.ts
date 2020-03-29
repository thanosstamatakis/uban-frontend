import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {}

  // Declarations
  private user = new BehaviorSubject<Object>(null);
  public userData = this.user.asObservable();
  private baseUrl = environment.baseUrl;

  // Use Google oAuth api to sign in
  public async signInWithGoogle(googleToken:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: googleToken
      })
    };

    let googleAuthPromise = this._http.get(this.baseUrl + 'google/auth', httpOptions).toPromise();
    let authData = await Promise.resolve(googleAuthPromise);
    let userData = authData['userData'];
    let token = authData['token'];
    this.user.next(userData);
    this.storeJWT(token);
    return userData;
  }

  // Use Facebook oAuth api to sign in
  public signInWithFacebook() {

  }

  // Use Github oAuth api to sign in
  public signInWithGithub() {

  }

  // Store session jwt
  public storeJWT(token: string) {
    localStorage.setItem('token', token);
  }

  // Remove session jwt
  public removeJWT(token: string) {
    localStorage.removeItem('token');
  }

}