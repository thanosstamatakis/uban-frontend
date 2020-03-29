import { trigger, transition, state, style, animate } from '@angular/animations';

export const fade = trigger('fade', [
  state('show', style({ opacity: 1 })),
  state('hidden', style({ opacity: 0 })),
  transition('show <=> hidden', animate('600ms ease-in-out'))
]);

export const accordion = trigger('accordion', [
  state('void', style({ height: 0 })),
  state('*', style({ height: '*' })),
  transition('* <=> void', animate('300ms ease-in-out'))
]);

export const flip = trigger('rotatedState', [
  state('default', style({ transform: 'rotate(0)' })),
  state('rotated', style({ transform: 'rotate(-180deg)' })),
  transition('rotated => default', animate('300ms ease-out')),
  transition('default => rotated', animate('300ms ease-in'))
]);

export const fadeRight = trigger('fadeRight', [
  state('*', style({ opacity: 1, transform: 'translate(0)' })),
  state('void', style({ opacity: 0, transform: 'translate(200px)' })),
  transition('void => *', animate('300ms ease-in-out'))
]);
