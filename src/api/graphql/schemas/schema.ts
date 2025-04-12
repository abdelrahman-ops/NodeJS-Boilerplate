import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String
    # Add your other queries here
  }

  type Mutation {
    # Add your mutations here
  }
`;