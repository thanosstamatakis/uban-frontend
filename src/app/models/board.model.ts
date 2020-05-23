import { Column } from './column.model';

export class Board {
  constructor(public name: string, public _id: string, public columns: Column[]) {}
}
