import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  
  payload: string;
  provider: string;
  loading : boolean = true;
  userData = {};
  
  constructor(private _route: ActivatedRoute, private _auth: AuthService, private _router: Router) {
    this.getProvider(window.location.pathname);
  }

  async signInWithGoogle(fragment: string) {
    // Get google token payload from redirect_uri
    this.payload = fragment.substring(
      fragment.lastIndexOf("id_token=") + ("id_token=").length, 
      fragment.lastIndexOf("&authuser=")
    );
    this.userData = await this._auth.signInWithGoogle(this.payload);
    this.loading = false;
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 2300);
  }

  // Find the current provider
  getProvider(path) {
    switch (path) {
      case '/verify/google':
        this.provider = 'google';
        break;
      default:
        break;
    }
  }

  // Subscribe to the url params and sign in with the
  // correct provider
  ngOnInit() {
    this._route.fragment.subscribe(fragment => {
      if (this.provider == 'google') {
          this.signInWithGoogle(fragment);
      }
    });
  }

}
