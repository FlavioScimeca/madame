import { authRelations } from '@/app/api/auth/schema/auth.relations';
import { userRelations } from '@/app/api/modules/user/schema/user.relations';

// Merge all modular relations into a single relations object
export const relations = {
  ...userRelations,
  ...authRelations,
};
