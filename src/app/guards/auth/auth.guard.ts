import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  async canActivate() {
    const isValid = (await this._auth.verifyToken())['valid'];
    if (isValid) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
