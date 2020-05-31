import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalService } from '@services/modal/modal.service';
import { TeamService } from '@services/team/team.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-new-team-modal',
  templateUrl: './new-team-modal.component.html',
  styleUrls: ['./new-team-modal.component.scss'],
})
export class NewTeamModalComponent implements OnInit {
  newTeamForm: FormGroup;
  showAnimation = false;
  users = [];
  members = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _modal: ModalService,
    private _team: TeamService,
    private _user: UserService
  ) {
    this.newTeamForm = _formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      members: [null],
    });
  }

  get formMembers(): any {
    return this.newTeamForm.get('members');
  }

  // Closes the modal when X is pressed
  closeModal() {
    this._modal.destroy();
  }

  // Calls api to create a new team
  createNewTeam(payload: Object) {
    let members = this.members.map((member) => {
      return member._id;
    });
    // Make sure there are no duplicate members
    let uniqueMembers = new Set(members);
    members = Array.from(uniqueMembers);
    payload = { ...payload, members: members };
    this._team.addNewTeam(payload).subscribe((result) => {
      this.showAnimation = true;
      console.log('Add team result:', result);
      setTimeout(() => {
        this._router.navigate([`/teams/${result['_id']}`]);
        this.closeModal();
      }, 2300);
    });
  }

  optionSelected(option) {
    console.log(option);
    this.members.push(option);
    this.formMembers.reset();
    this.users = [];
  }

  ngOnInit() {
    this.newTeamForm.controls.members.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(async (searchTerm) => {
        if (searchTerm === '') {
          this.users = [];
        } else {
          let result = await this._user.getUserByName(searchTerm);
          this.users = result['users'];
          console.log(result['users']);
        }
      });
  }
}
