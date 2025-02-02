"use client";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { use } from "react";

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      author
      publishedAt
    }
  }
`;

export default function PostDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="text-center text-red-500">
        <p>Error fetching post.</p>
        <p className="text-sm text-gray-400">Please try again later.</p>
      </div>
    );
  }

  if (!data?.post) {
    return <p className="text-center text-gray-500">Post not found.</p>;
  }

  const { title, description, author, publishedAt } = data.post;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 text-lg">{description}</p>
      <p className="text-sm text-gray-400 mt-4">By {author} | {new Date(publishedAt).toLocaleDateString()}</p>
    </div>
  );
}
