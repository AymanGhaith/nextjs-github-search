"use client";

import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { searchGitHub } from "../utils/github";
import RepoCard from "./RepoCard";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  languages_url: string;
  forks_url: string;
}

interface RepoResultsProps {
  initialResults: {
    items: Repo[];
    total_count: number;
  };
  query: string;
}

export default function RepoResults({
  initialResults,
  query,
}: RepoResultsProps) {
  const [results, setResults] = useState(initialResults);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        Repositories Found: {results.total_count}
      </h2>
      <div className="space-y-6">
        {results.items.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
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
