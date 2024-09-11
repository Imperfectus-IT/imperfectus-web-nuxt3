import { Role } from "~/server/contexts/backend/users/domain/Role";

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
    public role: Role,
    public jwt?: string,
  ) {}

  public hasAdminRole() {
    return this.role.isAdmin()
  }
}
