"use client";

import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $description: String!, $author: String!) {
    createPost(title: $title, description: $description, author: $author) {
      id
      title
      description
      author
      publishedAt
    }
  }
`;

const GET_POSTS = gql`
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
`;

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
});

export default function CreatePost() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema),
  });

  const router = useRouter();
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const onSubmit = async (data: any) => {
    await createPost({ variables: data });
    router.push("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Post</h1>
      {error && <p className="text-red-500 text-center mb-4">Error creating post</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
          {...register("title")}
        />
        {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}

        <textarea
          placeholder="Description"
          className="p-2 border rounded"
          {...register("description")}
        />
        {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}

        <input
          type="text"
          placeholder="Author"
          className="p-2 border rounded"
          {...register("author")}
        />
        {errors.author && <p className="text-red-500">{String(errors.author.message)}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
