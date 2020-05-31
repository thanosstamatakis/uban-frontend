export class Card {
  constructor(
    public name: string,
    public _id: string,
    public githubId?: string,
    public githubProject?: string,
    public githubColumn?: string
  ) {}
}
