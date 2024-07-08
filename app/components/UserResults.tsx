"use client";

import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { searchGitHub } from "../utils/github";

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

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const newResults = await searchGitHub("repos", query, nextPage);
      setResults((prevResults) => ({
        ...prevResults,
        items: [...prevResults.items, ...newResults.items],
      }));
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Users Found: {results.total_count}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.items.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 flex items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={results.items.length < results.total_count}
      />
      {loading && <p className="text-center mt-4">Loading more results...</p>}
    </div>
  );
}
