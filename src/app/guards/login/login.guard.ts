import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate() {
    const token = localStorage.getItem('token');
    if (token === null) {
      return true;
    } else {
      this._router.navigate(['/teams']);
      return false;
    }
  }
}
