export interface Message {
  _id: string;
  team?: string;
  sender: string;
  body: string;
  seenBy: [string];
}
