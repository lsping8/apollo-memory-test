const { ApolloServer, gql,PubSub } = require('apollo-server');

const pubsub = new PubSub();

const typeDefs = gql`
  type TestValue {
    value1: String
    value2: String
    value3: String
    value4: String
    value5: String
    value6: String
    value7: String
    value8: String
    value9: String
    value0: String
  }

  type Test {
    id: ID
    key1: TestValue
    key2: TestValue
    key3: TestValue
    key4: TestValue
    key5: TestValue
    key6: TestValue
    key7: TestValue
    key8: TestValue
    key9: TestValue
    key0: TestValue
  }

  type Query {
    test: Test
  }

  type Mutation {
    startTest: Test
  }

  type Subscription {
    subTest: Test
  }
`;

const getPayload = () => {
  let payload = {
    id: 1,
  }

  for (let i = 0; i < 10; i++) {
    payload[`key${i}`] = {
      value1: Math.random().toFixed(21),
      value2: Math.random().toFixed(21),
      value3: Math.random().toFixed(21),
      value4: Math.random().toFixed(21),
      value5: Math.random().toFixed(21),
      value6: Math.random().toFixed(21),
      value7: Math.random().toFixed(21),
      value8: Math.random().toFixed(21),
      value9: Math.random().toFixed(21),
      value0: Math.random().toFixed(21),
    }
  }

  return payload
}

const resolvers = {
    Query: {
      test: () => {
        return getPayload()
      },
    },
    Mutation: {
      startTest: () => {
        const payload = getPayload()
        setInterval(() => {
          pubsub.publish('POST_CREATED', { subTest: getPayload() });
        },10)
        return payload
      }
    },
    Subscription : {
      subTest: {
        subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
      }
    }
  };

const server = new ApolloServer({ typeDefs, resolvers, subscriptions: { path: '/subscriptions' } });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
