export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public confirmed: boolean,
    public blocked: boolean,
    public type: string,
    public marketingInfoComm: boolean,
    public whatsappInfoComm: boolean,
    public role: UserRoles,
    public jwt?: string,
  ) {}
}

type UserRoles = 'authenticated' | 'public' | 'admin'
