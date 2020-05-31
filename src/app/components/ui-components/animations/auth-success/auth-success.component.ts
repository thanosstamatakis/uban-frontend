import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'animation-auth-success',
  templateUrl: './auth-success.component.html',
  styleUrls: ['./auth-success.component.scss']
})
export class AuthSuccessComponent implements OnInit {

  lottieConfig: { path: string; renderer: string; autoplay: boolean; loop: boolean; };

  constructor() {
    this.lottieConfig = {
      path: 'assets/animations/lottie-fingerprint.json',
      renderer: 'canvas',
      autoplay: true,
      loop: false
    };
  }

  ngOnInit() {
  }

}
