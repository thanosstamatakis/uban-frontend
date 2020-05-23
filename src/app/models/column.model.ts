import { Card } from '@models/card.model';

export class Column {
  constructor(public name: string, public _id: string, public cards: Card[]) {}
}
