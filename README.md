🚀 Next.js GraphQL Blog

A simple blog application built using Next.js and GraphQL. Users can:

View a list of blog posts ✅

Read individual blog posts ✅

Create new blog posts ✅

Paginate through posts ✅


📌 Tech Stack

Frontend: Next.js, React, Apollo Client

Backend: Apollo Server, GraphQL

State Management: Apollo Client Cache

Styling: Tailwind CSS

🛠️ Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/SaimSaudagar/nextjs-graphql-blog.git
cd nextjs-graphql-blog

2️⃣ Install Dependencies

npm install

🎯 Running the Application

🔹 Start the GraphQL Server

npm run server

The GraphQL server will run at: http://localhost:4000

All posts will be reset on every restart

🔹 Start the Next.js Frontend

npm run dev

The Next.js app will run at: http://localhost:3000

🔥 GraphQL Backend

📌 Queries & Mutations

🔍 Fetch All Posts

query GetPosts($limit: Int!, $offset: Int!) {
  posts(limit: $limit, offset: $offset) {
    id
    title
    description
    author
    publishedAt
  }
  postCount
}

📌 Fetch a Single Post

query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    description
    author
    publishedAt
  }
}

✍️ Create a New Post

mutation CreatePost($title: String!, $description: String!, $author: String!) {
  createPost(title: $title, description: $description, author: $author) {
    id
    title
    description
    author
    publishedAt
  }
}

📌 Architecture Decisions

Next.js Pages & API Routes

Uses app/page.tsx for listing posts.

Uses app/post/[id]/page.tsx for viewing single posts.

app/create/page.tsx handles post creation.

Apollo Client for GraphQL

Uses useQuery for fetching posts.

Uses useMutation for creating posts.

Implements cache updates to ensure new posts appear without refreshing.

GraphQL Server with Apollo Server

Runs on http://localhost:4000

Stores posts in-memory, so they reset on restart.
