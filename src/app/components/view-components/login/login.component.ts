import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: 'http://localhost:4200/verify/google/',
    clientId: '647941072276-d6m34gl68i8ape6e4u86equevd1h5foc.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
  };
  loginForm: FormGroup;

  constructor(private _oauthService: OAuthService, private _formBuilder: FormBuilder) {
    this._oauthService.configure(this._authConfig);
    this._oauthService.tokenValidationHandler = new JwksValidationHandler();
    this._oauthService.loadDiscoveryDocumentAndTryLogin();
    this.loginForm = _formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  initLogin() {
    this._oauthService.initImplicitFlow();
  }

  ngOnInit() {}
}
