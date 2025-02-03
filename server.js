import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
    author: String!
    publishedAt: String!
  }

  type Query {
    posts(limit: Int, offset: Int): [Post]
    post(id: ID!): Post  # ✅ Added single post query
    postCount: Int!
  }

  type Mutation {
    createPost(title: String!, description: String!, author: String!): Post
  }
`;

let posts = [];

const resolvers = {
  Query: {
    posts: (_, { limit = 5, offset = 0 }) => posts.slice(offset, offset + limit),
    post: (_, { id }) => posts.find((post) => post.id === id) || null,
    postCount: () => posts.length,
  },
  Mutation: {
    createPost: (_, { title, description, author }) => {
      const newPost = {
        id: String(posts.length + 1),
        title,
        description,
        author,
        publishedAt: new Date().toISOString(),
      };
      posts.unshift(newPost);
      return newPost;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const PORT = process.env.PORT || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { PORT },
});

console.log(`🚀 GraphQL server running at ${url}`);
