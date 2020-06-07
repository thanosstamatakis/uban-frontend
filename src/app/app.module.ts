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
import { BoardsComponent } from '@view/boards/boards.component';
import { LoginComponent } from '@view/login/login.component';
import { VerifyComponent } from '@view/verify/verify.component';
import { AuthSuccessComponent } from '@ui/animations/auth-success/auth-success.component';
import { TeamsComponent } from '@view/teams/teams.component';
import { NewTeamModalComponent } from '@ui/new-team-modal/new-team-modal.component';

// Services
import { ModalService } from '@services/modal/modal.service';
import { DomService } from '@services/dom/dom.service';
import { BuildingTeamComponent } from '@ui/animations/building-team/building-team.component';
import { ReversePipe } from '@helpers/pipes/reverse.pipe';
import { DropdownComponent } from '@ui/dropdown/dropdown.component';
import { UserSettingsComponent } from '@ui/user-settings/user-settings.component';
import { LoadingComponent } from './components/ui-components/animations/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    LoginComponent,
    VerifyComponent,
    AuthSuccessComponent,
    TeamsComponent,
    NewTeamModalComponent,
    BuildingTeamComponent,
    ReversePipe,
    DropdownComponent,
    UserSettingsComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieAnimationViewModule,
    OAuthModule.forRoot(),
  ],
  providers: [DomService, ModalService],
  bootstrap: [AppComponent],
  entryComponents: [NewTeamModalComponent, UserSettingsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
