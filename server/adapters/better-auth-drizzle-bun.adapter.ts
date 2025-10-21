import { createAdapter } from 'better-auth/adapters';
import { and, eq } from 'drizzle-orm';

export const betterAuthDrizzleBunAdapter = (db: any, schema: any) => {
  return createAdapter({
    config: {
      adapterId: 'drizzle-bun-adapter',
      adapterName: 'Drizzle Bun Adapter',
      supportsJSON: true,
      supportsDates: true,
      supportsBooleans: true,
      supportsNumericIds: false,
    },
    adapter: () => {
      // Helper to get table from schema
      const getTable = (modelName: string) => {
        const table = schema[modelName];
        if (!table) {
          throw new Error(`Table ${modelName} not found in schema`);
        }
        return table;
      };

      // Helper to build where clause
      const buildWhere = (
        table: any,
        where: Array<{ field: string; value: any }>
      ) => {
        if (!where || where.length === 0) return undefined;

        const conditions = where.map(({ field, value }) => {
          const column = table[field];
          if (!column) {
            throw new Error(`Field ${field} not found in table`);
          }
          return eq(column, value);
        });

        return conditions.length === 1 ? conditions[0] : and(...conditions);
      };

      return {
        create: async ({ model, data }) => {
          const table = getTable(model);
          const [result] = await db
            .insert(table)
            .values(data as any)
            .returning();
          return result as any;
        },

        findOne: async ({ model, where }) => {
          const table = getTable(model);
          const whereClause = buildWhere(table, where);

          const [result] = await db
            .select()
            .from(table)
            .where(whereClause!)
            .limit(1);

          return result ?? null;
        },

        findMany: async ({ model, where, limit, offset }) => {
          const table = getTable(model);
          let query = db.select().from(table);

          if (where && where.length > 0) {
            const whereClause = buildWhere(table, where);
            query = query.where(whereClause!) as any;
          }

          if (limit) {
            query = query.limit(limit) as any;
          }

          if (offset) {
            query = query.offset(offset) as any;
          }

          return await query;
        },

        update: async ({ model, where, update }) => {
          const table = getTable(model);
          const whereClause = buildWhere(table, where);

          const [result] = await db
            .update(table)
            .set(update as any)
            .where(whereClause!)
            .returning();

          return result as any;
        },

        updateMany: async ({ model, where, update }) => {
          const table = getTable(model);
          const whereClause = buildWhere(table, where);

          const results = await db
            .update(table)
            .set(update as any)
            .where(whereClause!)
            .returning();

          return results.length;
        },

        delete: async ({ model, where }) => {
          const table = getTable(model);
          const whereClause = buildWhere(table, where);

          await db.delete(table).where(whereClause!);
        },

        deleteMany: async ({ model, where }) => {
          const table = getTable(model);
          const whereClause = buildWhere(table, where);

          const results = await db
            .delete(table)
            .where(whereClause!)
            .returning();
          return results.length;
        },

        count: async ({ model, where }) => {
          const table = getTable(model);
          let query = db.select().from(table);

          if (where && where.length > 0) {
            const whereClause = buildWhere(table, where);
            query = query.where(whereClause!) as any;
          }

          const results = await query;
          return results.length;
        },
      };
    },
  });
};
