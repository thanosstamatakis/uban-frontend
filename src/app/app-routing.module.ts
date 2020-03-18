import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from './components/view-components/boards/boards.component';
import { LoginComponent } from './components/view-components/login/login.component';
import { VerifyComponent } from './components/view-components/verify/verify.component';


const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'verify/google', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
