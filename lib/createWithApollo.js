import {
  ApolloClient,
  ApolloLink,
  empty,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { parseCookies } from "nookies";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";

let apolloClient;

const createApolloClient = (
  context
) =>
  new ApolloClient({
    ssrMode: false,
    link: initLink(context),
    cache: new InMemoryCache(),
  });

const initLink = (ctx) => {
  const cookie = parseCookies(ctx);

  const wsLink = typeof window !== 'undefined'
    ? new WebSocketLink({
        uri: "ws://localhost:4000/subscriptions",
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              cookie: cookie,
            },
          },
        },
      })
    : empty();

  const link = createUploadLink({
    uri: "http://localhost:4000/graphql",
  });

  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: ctx?.req?.headers,
    });
    return forward(operation);
  });

  const httpLink = middlewareLink.concat(link);

  return split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
};

export const initializeApollo = (
  initialState,
  context
) => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (!process.browser) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const useApollo = (
  initialState,
  context
) => {
  const store = initializeApollo(initialState, context);
  return store;
};

export const useApolloServer = (
  initialState,
  context
) => {
  const store = initializeApollo(initialState, context);
  return store;
};
