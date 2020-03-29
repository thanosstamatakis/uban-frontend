// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Installed Modules
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LottieAnimationViewModule } from 'ng-lottie';

// Components
import { AppComponent } from './app.component';
import { BoardsComponent } from './components/view-components/boards/boards.component';
import { LoginComponent } from './components/view-components/login/login.component';
import { VerifyComponent } from './components/view-components/verify/verify.component';
import { AuthSuccessComponent } from './components/ui-components/animations/auth-success/auth-success.component';
import { TeamsComponent } from './components/view-components/teams/teams.component';
import { NewTeamModalComponent } from './components/ui-components/new-team-modal/new-team-modal.component';

// Services
import { ModalService } from '@services/modal/modal.service';
import { DomService } from '@services/dom/dom.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    LoginComponent,
    VerifyComponent,
    AuthSuccessComponent,
    TeamsComponent,
    NewTeamModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieAnimationViewModule,
    OAuthModule.forRoot()
  ],
  providers: [DomService, ModalService],
  bootstrap: [AppComponent],
  entryComponents: [NewTeamModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
