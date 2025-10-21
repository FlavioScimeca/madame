import { db } from '@/database/init';
import { relations } from '@/database/relations';
import SchemaBuilder from '@pothos/core';
import DrizzlePlugin from '@pothos/plugin-drizzle';
import RelayPlugin from '@pothos/plugin-relay';
import WithInputPlugin from '@pothos/plugin-with-input';
import { getTableConfig } from 'drizzle-orm/pg-core';

export interface PothosTypes {
  DrizzleRelations: typeof relations;
  Context: {
    db: typeof db;
    session: any;
  };
}

export const builder = new SchemaBuilder<PothosTypes>({
  plugins: [RelayPlugin, WithInputPlugin, DrizzlePlugin],
  drizzle: {
    client: db,
    relations,
    getTableConfig,
  },
});

builder.queryType({});
// builder.mutationType({}); // Uncomment when you add mutations
