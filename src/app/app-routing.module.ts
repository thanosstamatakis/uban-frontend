import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from '@view/boards/boards.component';
import { LoginComponent } from '@view/login/login.component';
import { VerifyComponent } from '@view/verify/verify.component';
import { TeamsComponent } from '@view/teams/teams.component';
import { AuthGuard } from '@guards/auth/auth.guard';
import { LoginGuard } from '@guards/login/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'verify/google', component: VerifyComponent, canActivate: [LoginGuard] },
  { path: 'verify/github', component: VerifyComponent, canActivate: [LoginGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'teams/:id', component: BoardsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
