import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  payload: string;
  provider: string;
  loading: boolean = true;
  userData: User;

  constructor(private _route: ActivatedRoute, private _auth: AuthService, private _router: Router) {
    console.log(window.location.pathname);
    this.getProvider(window.location.pathname);
  }

  async signInWithGoogle(fragment: string) {
    // Get google token payload from redirect_uri
    this.payload = fragment.substring(
      fragment.lastIndexOf('id_token=') + 'id_token='.length,
      fragment.lastIndexOf('&authuser=')
    );
    this.userData = await this._auth.signInWithGoogle(this.payload);
    this.loading = false;
    setTimeout(() => {
      this._router.navigate(['/teams']);
    }, 2300);
  }

  async signInWithGithub(payload: string) {
    this.userData = await this._auth.signInWithGithub(payload);
    this.loading = false;
    setTimeout(() => {
      this._router.navigate(['/teams']);
    }, 2300);
  }

  // Find the current provider
  getProvider(path) {
    switch (path) {
      case '/verify/google':
        this.provider = 'google';
        break;
      case '/verify/github':
        this.provider = 'github';
        break;
      default:
        break;
    }
  }

  // Subscribe to the url params and sign in with the
  // correct provider
  ngOnInit() {
    this._route.fragment.subscribe((fragment) => {
      console.log(fragment);
      if (this.provider == 'google') {
        this.signInWithGoogle(fragment);
      }
    });
    this._route.queryParamMap.subscribe((queryParam) => {
      if (this.provider == 'github') {
        this.signInWithGithub(queryParam.get('code'));
      }
      console.log(queryParam);
    });
  }
}
