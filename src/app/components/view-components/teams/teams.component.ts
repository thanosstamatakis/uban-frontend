import { Component, OnInit } from '@angular/core';
import { TeamService } from '@services/team/team.service';
import { AuthService } from '@services/auth/auth.service';
import { ModalService } from '@services/modal/modal.service';
import { NewTeamModalComponent } from '@ui/new-team-modal/new-team-modal.component';
import { GithubService } from '@services/github/github.service';
import { UserSettingsComponent } from '@ui/user-settings/user-settings.component';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { MessageService } from '@services/message/message.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  userData: User;
  teams: Object;
  unreadMessages = [];
  showUnread = false;
  constructor(
    private _team: TeamService,
    private _auth: AuthService,
    private _modal: ModalService,
    private _git: GithubService,
    private _messages: MessageService,
    private _router: Router
  ) {
    this._auth.userData.subscribe((userData: User) => {
      this.userData = userData;
      this._messages.getUnreadMessages(this.userData._id).subscribe((unreadMessages: Array<Object>) => {
        let mappedTeams = unreadMessages.map((team) => {
          return team['team'][0];
        });
        this.unreadMessages = mappedTeams;
      });
    });
    this.getTeams();
  }

  addTeam() {
    this._modal.init(NewTeamModalComponent, {}, {});
  }

  optionSelected(option) {
    console.log(option);
    this._router.navigate(['/teams', option._id]);
  }

  toggleMessages() {
    this.showUnread = !this.showUnread;
  }

  importGithubTeams() {
    this._git.getGithubTeams().subscribe((res) => {
      console.log(res);
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  toggleSettings() {
    this._modal.init(UserSettingsComponent, { userId: this.userData._id, teams: this.teams }, {});
  }

  getTeams() {
    this._team.getUserTeams().subscribe((teams) => {
      console.log(teams);
      this.teams = teams;
    });
  }

  ngOnInit() {}
}
