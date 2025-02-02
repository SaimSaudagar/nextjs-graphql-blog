"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState, useEffect } from "react";

const GET_POSTS = gql`
  query GetPosts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset) {
      id
      title
      description
      publishedAt
    }
    postCount
  }
`;

export default function Home() {
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  const { data, loading, error, refetch } = useQuery(GET_POSTS, {
    variables: { limit: postsPerPage, offset: (page - 1) * postsPerPage },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    const handleFocus = () => refetch();
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="text-center text-red-500">
        <p>Error fetching posts.</p>
        <p className="text-sm text-gray-400">Please try again later.</p>
      </div>
    );
  }

  const posts = data?.posts || [];
  const totalPages = Math.ceil((data?.postCount || 0) / postsPerPage);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
        <Link href="/create">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            + Create Post
          </button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        posts.map((post: any) => (
          <div key={post.id} className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition mb-4">
            <h2 className="text-xl font-semibold text-blue-600">
              <Link href={`/post/${post.id}`} className="block">
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
              </Link>
            </h2>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Previous
          </button>
          <span className="text-lg font-medium">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
