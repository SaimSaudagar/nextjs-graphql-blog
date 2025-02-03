import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "https://nextjs-graphql-blog-1.onrender.com",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
