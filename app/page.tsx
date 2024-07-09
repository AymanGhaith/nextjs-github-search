import { Suspense } from "react";
import SearchForm from "./components/SearchForm";
import UserResults from "./components/UserResults";
import RepoResults from "./components/RepoResults";
import { searchGitHub } from "./utils/github";
import RepoResultsSkeleton from "./components/RepoResultsSkeleton";
import UserResultsSkeleton from "./components/UserResultsSkeleton";
import ErrorMessage from "./components/ErrorMessage";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = (searchParams.type as "users" | "repos") || "users";
  const query = searchParams.q as string;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">GitHub Search</h1>
      <SearchForm />
      {query && (
        <Suspense
          fallback={
            type === "users" ? <UserResultsSkeleton /> : <RepoResultsSkeleton />
          }
        >
          <Results type={type} query={query} />
        </Suspense>
      )}
    </main>
  );
}

async function Results({
  type,
  query,
}: {
  type: "users" | "repos";
  query: string;
}) {
  let initialResults = null;
  let error = null;

  try {
    initialResults = await searchGitHub(type, query);
  } catch (err) {
    console.error("Error fetching search results:", err);
    error =
      err instanceof Error
        ? err.message
        : "An error occurred while fetching results.";
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!initialResults.total_count) {
    return (
      <div className="mt-8 w-full max-w-4xl">
        <p>No results found.</p>
      </div>
    );
  }

  return type === "users" ? (
    <UserResults initialResults={initialResults} query={query} />
  ) : (
    <RepoResults initialResults={initialResults} query={query} />
  );
}
