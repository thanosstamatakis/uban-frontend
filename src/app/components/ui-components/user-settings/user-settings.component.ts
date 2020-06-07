import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  @Input() userId: any;
  @Input() teams: any;
  loading = true;
  user: User;

  constructor(private _user: UserService, private _auth: AuthService) {}

  changeValue(payload) {
    console.log(payload);
    this._user.changeUser(this.userId, payload).subscribe((changes) => {
      console.log(changes);
      this.getUser();
      this._auth.verifyToken();
    });
  }

  ngOnInit() {
    this.getUser();
    this.teams = this.teams ? this.teams.length : 0;
  }

  getUser() {
    this._user.getUser(this.userId).subscribe((user) => {
      console.log(user);
      this.user = user;
      this.loading = false;
    });
  }
}
