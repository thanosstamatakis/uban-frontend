import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { accordion } from '@helpers/animations';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [accordion],
})
export class DropdownComponent implements OnInit {
  @Input() options: any;
  @Input() field = '';
  @Output() onOptionSelected = new EventEmitter();
  constructor() {}

  selectedOption(option) {
    this.onOptionSelected.emit(option);
  }

  ngOnInit() {}
}
