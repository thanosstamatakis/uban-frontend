import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AppComponent } from './app.component';
import { BoardsComponent } from './components/view-components/boards/boards.component';
import { LoginComponent } from './components/view-components/login/login.component';
import { VerifyComponent } from './components/view-components/verify/verify.component';
import { AuthSuccessComponent } from './components/ui-components/animations/auth-success/auth-success.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    LoginComponent,
    VerifyComponent,
    AuthSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    LottieAnimationViewModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
