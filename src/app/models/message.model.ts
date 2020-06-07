import { User } from './user.model';

export interface Message {
  _id: string;
  team?: string;
  sender: User | string;
  body: string;
  seenBy: [string];
}
