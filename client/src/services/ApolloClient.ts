import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,

} from "@apollo/client";

import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { Observable } from "rxjs";

type RefreshAccessTokenResponse = {
  refreshAccessToken: {
    accessToken: string;
  };
};

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});


const REFRESH_ACCESS_TOKEN = gql`
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

const refreshClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const authLink = new SetContextLink((previousContext) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...previousContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  const isUnauthenticated =
    CombinedGraphQLErrors.is(error) &&
    error.errors.some(
      (graphQLError) =>
        graphQLError.extensions?.code === "UNAUTHENTICATED"
    );

  if (!isUnauthenticated) {
    return;
  }

  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    return;
  }

  return new Observable((observer) => {
    let subscription: { unsubscribe: () => void } | undefined;

    refreshClient
      .mutate({
        mutation: REFRESH_ACCESS_TOKEN,
        variables: { refreshToken },
      })
      .then((result) => {
        const newAccessToken =
          (result.data as RefreshAccessTokenResponse)?.refreshAccessToken?.accessToken;

        if (!newAccessToken) {
          throw new Error("Could not refresh access token");
        }

        localStorage.setItem("accessToken", newAccessToken);

        operation.setContext(
          ({ headers = {} }: { headers?: Record<string, string> }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${newAccessToken}`,
            },
          })
        );

        subscription = forward(operation).subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
        observer.error(err);
      });

    return () => subscription?.unsubscribe();
  });
});

const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
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

export { apolloClient };