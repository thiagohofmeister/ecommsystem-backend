export class Authentication {
  constructor(private authToken: string) {}

  public getAuthToken(): string {
    return this.authToken
  }
}
