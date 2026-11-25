"use client";

import { url } from "inspector";
import { title } from "process";
import { Suspense } from "react";
import useSWR from "swr";

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then();
type Photo = {
  id: string;
  title: string;
};

export default function Blog2Page() {
  const { data, error, isLoading } = useSWR<Photo[]>(
    "https://jsonplaaceholder.typicode.com/photos",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;

  return (
    <>
      <h1>Blog2 page - photo</h1>
      <ul>
        <Suspense></Suspense>
      </ul>
    </>
  );
}
