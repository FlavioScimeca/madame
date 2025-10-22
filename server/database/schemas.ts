import * as authSchema from '@/app/api/auth/schema/account.schema';
import * as jwksSchema from '@/app/api/auth/schema/jwks.schema';
import * as sessionSchema from '@/app/api/auth/schema/session.schema';
import * as verificationSchema from '@/app/api/auth/schema/verification.schema';
import * as invitationSchema from '@/app/api/modules/organization/schema/invitation.schema';
import * as memberSchema from '@/app/api/modules/organization/schema/member.schema';
import * as organizationSchema from '@/app/api/modules/organization/schema/organization.schema';
import * as userSchema from '@/app/api/modules/user/schema/user.schema';

export const schemas = {
  ...userSchema,
  ...authSchema,
  ...sessionSchema,
  ...verificationSchema,
  ...organizationSchema,
  ...memberSchema,
  ...invitationSchema,
  ...jwksSchema,
};
