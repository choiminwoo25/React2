import Posts from "@/src/components/posts";
import getPosts from "@/src/lib/getPosts";
import { Suspense } from "react";

export default function Page() {
  const posts = getPosts("https://jsonplaceholder.typicode.com/posts");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  );
}
