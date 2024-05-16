export interface User {
  id: string;
  username: string;
  email: string;
  authentication: AuthRecord[];
}

export interface AuthRecord {
  id: string;
  authType: string;
  userId: string;
  password: string;
  salt: string;
  sessionToken: string;
}
