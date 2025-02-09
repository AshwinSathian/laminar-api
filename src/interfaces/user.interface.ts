import { UserRole } from '@laminar-api/enums';
import { Base } from './base.interface';

export interface User extends Base {
  email: string;
  password?: string;
  refreshTokens?: string[];
  role: UserRole;
}
