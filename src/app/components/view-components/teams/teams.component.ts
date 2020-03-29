import { Component, OnInit } from '@angular/core';
import { TeamService } from '@services/team/team.service';
import { AuthService } from '@services/auth/auth.service';
import { ModalService } from '@services/modal/modal.service';
import { NewTeamModalComponent } from '@ui/new-team-modal/new-team-modal.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  userData: Object;
  teams: Object;
  // teams = [
  //   {
  //     _id: 12345,
  //     name: 'Project 1',
  //     description:
  //       'Το Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες της τυπογραφίας και στοιχειοθεσίας.',
  //     members: [
  //       {
  //         _id: '5e72a2f6eb70b855b1e2b09f',
  //         verified: true,
  //         email: 'thanos.stamatakis@gmail.com',
  //         displayName: 'Thanos Stamatakis',
  //         roleName: 'google',
  //         profilePicture:
  //           'https://lh6.googleusercontent.com/-_C9ZgA73znQ/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA9xmz7LAPHUp9-jgxz3pC4mIHEEw/s96-c/photo.jpg',
  //         googleId: '101309936106107011007',
  //         __v: 0
  //       },
  //       {
  //         _id: '5e72a2f6eb70b855b1e2b09f',
  //         verified: true,
  //         email: 'thanos.stamatakis@gmail.com',
  //         displayName: 'Thanos Stamatakis',
  //         roleName: 'google',
  //         profilePicture:
  //           'https://lh6.googleusercontent.com/-_C9ZgA73znQ/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA9xmz7LAPHUp9-jgxz3pC4mIHEEw/s96-c/photo.jpg',
  //         googleId: '101309936106107011007',
  //         __v: 0
  //       }
  //     ]
  //   },
  //   {
  //     _id: 12346,
  //     name: 'Project 2',
  //     description:
  //       'Είναι πλέον κοινά παραδεκτό ότι ένας αναγνώστης αποσπάται από το περιεχόμενο που διαβάζει, όταν εξετάζει τη διαμόρφωση μίας σελίδας.',
  //     members: [
  //       {
  //         _id: '5e72a2f6eb70b855b1e2b09f',
  //         verified: true,
  //         email: 'thanos.stamatakis@gmail.com',
  //         displayName: 'Thanos Stamatakis',
  //         roleName: 'google',
  //         profilePicture:
  //           'https://lh6.googleusercontent.com/-_C9ZgA73znQ/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA9xmz7LAPHUp9-jgxz3pC4mIHEEw/s96-c/photo.jpg',
  //         googleId: '101309936106107011007',
  //         __v: 0
  //       },
  //       {
  //         _id: '5e72a2f6eb70b855b1e2b09f',
  //         verified: true,
  //         email: 'thanos.stamatakis@gmail.com',
  //         displayName: 'Thanos Stamatakis',
  //         roleName: 'google',
  //         profilePicture:
  //           'https://lh6.googleusercontent.com/-_C9ZgA73znQ/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA9xmz7LAPHUp9-jgxz3pC4mIHEEw/s96-c/photo.jpg',
  //         googleId: '101309936106107011007',
  //         __v: 0
  //       }
  //     ]
  //   },
  //   {
  //     _id: 12347,
  //     name: 'Project 3',
  //     description:
  //       'Αντίθετα με αυτό που θεωρεί η πλειοψηφία, το Lorem Ipsum δεν είναι απλά ένα τυχαίο κείμενο. Οι ρίζες του βρίσκονται σε ένα κείμενο Λατινικής λογοτεχνίας του 45 π.Χ., φτάνοντας την ηλικία του πάνω από 2000 έτη.',
  //     members: [
  //       {
  //         _id: '5e72a2f6eb70b855b1e2b09f',
  //         verified: true,
  //         email: 'thanos.stamatakis@gmail.com',
  //         displayName: 'Thanos Stamatakis',
  //         roleName: 'google',
  //         profilePicture:
  //           'https://lh6.googleusercontent.com/-_C9ZgA73znQ/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA9xmz7LAPHUp9-jgxz3pC4mIHEEw/s96-c/photo.jpg',
  //         googleId: '101309936106107011007',
  //         __v: 0
  //       },
  //       {
  //         _id: '5e72a2f6eb70b855b1e2b09f',
  //         verified: true,
  //         email: 'thanos.stamatakis@gmail.com',
  //         displayName: 'Thanos Stamatakis',
  //         roleName: 'google',
  //         profilePicture:
  //           'https://lh6.googleusercontent.com/-_C9ZgA73znQ/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nA9xmz7LAPHUp9-jgxz3pC4mIHEEw/s96-c/photo.jpg',
  //         googleId: '101309936106107011007',
  //         __v: 0
  //       }
  //     ]
  //   }
  // ];

  constructor(private _team: TeamService, private _auth: AuthService, private _modal: ModalService) {
    this._auth.userData.subscribe(userData => (this.userData = userData));
    this.getTeams();
  }

  addTeam() {
    this._modal.init(NewTeamModalComponent, {}, {});
  }

  getTeams() {
    this._team.getAllTeams().subscribe(teams => {
      console.log(teams);
      this.teams = teams;
    });
  }

  ngOnInit() {}
}
