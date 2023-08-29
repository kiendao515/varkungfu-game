import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: "kiendao2001",
  expires: "10h"
}));