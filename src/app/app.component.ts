import { Component } from '@angular/core';
import { ModalService } from '@services/modal/modal.service';
import { fade } from '@helpers/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})
export class AppComponent {
  title = 'frontend';

  constructor(private _modalService: ModalService) {}

  public removeModal() {
    this._modalService.setModalState('hidden');
  }

  public deleteModal(event) {
    if (event.fromState === 'show' && event.toState === 'hidden') {
      this._modalService.destroy();
    } else {
      return;
    }
  }

  public getModalState() {
    return this._modalService.getModalState();
  }

}
