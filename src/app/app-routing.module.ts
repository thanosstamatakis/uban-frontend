import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from './components/view-components/boards/boards.component';
import { LoginComponent } from './components/view-components/login/login.component';


const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
