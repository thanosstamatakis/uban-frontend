import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'animation-building-team',
  templateUrl: './building-team.component.html',
  styleUrls: ['./building-team.component.scss']
})
export class BuildingTeamComponent implements OnInit {
  lottieConfig: { path: string; renderer: string; autoplay: boolean; loop: boolean };
  constructor() {
    this.lottieConfig = {
      path: 'assets/animations/build-team.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit() {}
}
