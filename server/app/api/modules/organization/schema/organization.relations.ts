import { user } from '@/app/api/modules/user/schema/user.schema';
import { defineRelations } from 'drizzle-orm';
import { invitation } from './invitation.schema';
import { member } from './member.schema';
import { organization } from './organization.schema';

export const organizationRelations = defineRelations(
  { organization, member, invitation, user },
  (r) => ({
    organization: {
      members: r.many.member({
        from: r.organization.id,
        to: r.member.organizationId,
      }),
      invitations: r.many.invitation({
        from: r.organization.id,
        to: r.invitation.organizationId,
      }),
    },
    member: {
      organization: r.one.organization({
        from: r.member.organizationId,
        to: r.organization.id,
      }),
      user: r.one.user({
        from: r.member.userId,
        to: r.user.id,
      }),
    },
    invitation: {
      organization: r.one.organization({
        from: r.invitation.organizationId,
        to: r.organization.id,
      }),
      inviter: r.one.user({
        from: r.invitation.inviterId,
        to: r.user.id,
      }),
    },
  })
);
