"use client";

import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { searchGitHub } from "../utils/github";
import UserCard from "./UserCard";

interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface UserResultsProps {
  initialResults: {
    items: User[];
    total_count: number;
  };
  query: string;
}

export default function UserResults({
  initialResults,
  query,
}: UserResultsProps) {
  const [results, setResults] = useState(initialResults);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const newResults = await searchGitHub("users", query, nextPage);
      setResults((prevResults) => ({
        ...prevResults,
        items: [...prevResults.items, ...newResults.items],
      }));
      setPage(nextPage);
      setError(null);
    } catch (error) {
      console.error("Error loading more results:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while loading results."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">
        Users Found: {results.total_count}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.items.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!error && (
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={results.items.length < results.total_count}
        />
      )}
      {loading && <p className="text-center mt-4">Loading more results...</p>}
    </div>
  );
}
