import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  lottieConfig: { path: string; renderer: string; autoplay: boolean; loop: boolean };
  constructor() {
    this.lottieConfig = {
      path: 'assets/animations/loading.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true,
    };
  }
  ngOnInit() {}
}
