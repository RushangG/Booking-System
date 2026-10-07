import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const BASE_URL = "http://localhost:4000";

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});
