import { Injectable } from '@angular/core';
import { DomService } from '@services/dom/dom.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalElmementId = 'modal-container';
  private overlayElement = 'overlay';
  private modalState = 'hidden';

  constructor(private _dom: DomService) {}

  init(component: any, inputs: object, outputs: object) {
    const componentConfig = { inputs, outputs };

    // Call the DOM service methods to add modal to DOM
    this._dom.appendComponentTo(this.modalElmementId, component, componentConfig);

    // Show the modal and overlay
    this.showElems(true);
    this.setModalState('show');
  }

  destroy() {
    this._dom.removeComponent();
    this.showElems(false);
  }

  private showElems(show: boolean) {
    if (show) {
      document.getElementById(this.modalElmementId).className = 'show';
      document.getElementById(this.overlayElement).className = 'show';
    } else {
      document.getElementById(this.overlayElement).className = 'hidden';
      document.getElementById(this.modalElmementId).className = 'hidden';
    }
  }

  public getModalState() {
    return this.modalState;
  }

  public setModalState(state) {
    this.modalState = state;
  }

}
