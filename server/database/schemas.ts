import * as authSchema from '@/app/api/auth/schema/account.schema';
import * as sessionSchema from '@/app/api/auth/schema/session.schema';
import * as verificationSchema from '@/app/api/auth/schema/verification.schema';
import * as userSchema from '@/app/api/modules/user/schema/user.schema';

export const schemas = {
  ...userSchema,
  ...authSchema,
  ...sessionSchema,
  ...verificationSchema,
};
