import Posts from "@/src/components/posts";
import { Suspense } from "react";
import getPosts from "@/lib/getPosts";

export default function Page() {
  const posts = getPosts("https://jsonplaceholder.typicode");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  );
}
