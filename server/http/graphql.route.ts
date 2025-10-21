import { schema } from '@/configs/graphql/schema';
import { createYoga } from 'graphql-yoga';

export const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  landingPage: true,
  graphiql: {
    endpoint: '/graphql',
    title: 'Madame GraphQL',
    defaultQuery: /* GraphQL */ `
      query {
        hello
      }
    `,
  },
  context: ({ request }) => {
    // session injected by middleware (see below)
    // return typed context here if needed
    return {};
  },
});
