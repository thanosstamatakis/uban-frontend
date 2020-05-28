import { Component, OnInit } from '@angular/core';
import { TeamService } from '@services/team/team.service';
import { AuthService } from '@services/auth/auth.service';
import { ModalService } from '@services/modal/modal.service';
import { NewTeamModalComponent } from '@ui/new-team-modal/new-team-modal.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  userData: Object;
  teams: Object;

  constructor(private _team: TeamService, private _auth: AuthService, private _modal: ModalService) {
    this._auth.userData.subscribe((userData) => (this.userData = userData));
    this.getTeams();
  }

  addTeam() {
    this._modal.init(NewTeamModalComponent, {}, {});
  }

  getTeams() {
    this._team.getUserTeams().subscribe((teams) => {
      console.log(teams);
      this.teams = teams;
    });
  }

  ngOnInit() {}
}
