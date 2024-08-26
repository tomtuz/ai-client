import { GraphQLClient } from 'graphql-request';

interface QueryVariables {
  [key: string]: any;
}

export class GraphQLAPIClient {
  private client: GraphQLClient;

  constructor(endpoint: string) {
    this.client = new GraphQLClient(endpoint);
  }

  async query<T>(query: string, variables?: QueryVariables): Promise<T> {
    try {
      const data = await this.client.request<T>(query, variables);
      return data;
    } catch (error) {
      console.error('GraphQL query error:', error);
      throw error;
    }
  }

  async mutate<T>(mutation: string, variables?: QueryVariables): Promise<T> {
    try {
      const data = await this.client.request<T>(mutation, variables);
      return data;
    } catch (error) {
      console.error('GraphQL mutation error:', error);
      throw error;
    }
  }

  setHeader(key: string, value: string): void {
    this.client.setHeader(key, value);
  }
}

// Usage example:
// const client = new GraphQLAPIClient('https://api.example.com/graphql');
// client.setHeader('Authorization', 'Bearer TOKEN');
// const data = await client.query<UserData>('query { user { id name email } }');
