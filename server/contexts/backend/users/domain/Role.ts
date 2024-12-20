export class Role {
  private constructor(
    public id: number,
    public name: string,
    public type: boolean,
  ) {
  }

  public isAdmin() {
    return 'admin' === this.type
  }
}
