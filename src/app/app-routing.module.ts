import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from '@view/boards/boards.component';
import { LoginComponent } from '@view/login/login.component';
import { VerifyComponent } from '@view/verify/verify.component';
import { TeamsComponent } from '@view/teams/teams.component';

const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'verify/google', component: VerifyComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:id', component: BoardsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
