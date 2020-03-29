import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalService } from '@services/modal/modal.service';
import { TeamService } from '@services/team/team.service';

@Component({
  selector: 'app-new-team-modal',
  templateUrl: './new-team-modal.component.html',
  styleUrls: ['./new-team-modal.component.scss']
})
export class NewTeamModalComponent implements OnInit {
  newTeamForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _modal: ModalService, private _team: TeamService) {
    this.newTeamForm = _formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
  }

  // Closes the modal when X is pressed
  closeModal() {
    this._modal.destroy();
  }

  // Calls api to create a new team
  createNewTeam(payload: Object) {
    console.log(payload);
    this._team.addNewTeam(payload).subscribe(result => console.log(result));
  }

  ngOnInit() {}
}
