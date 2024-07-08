import SearchForm from "./components/SearchForm";
import UserResults from "./components/UserResults";
import RepoResults from "./components/RepoResults";

import { searchGitHub } from "./utils/github";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = (searchParams.type as "users" | "repos") || "users";
  const query = searchParams.q as string;

  let initialResults = null;
  if (query) {
    try {
      initialResults = await searchGitHub(type, query);
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error (e.g., display error message to user)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">GitHub Search</h1>
      <SearchForm />
      {initialResults &&
        (type === "users" ? (
          <UserResults initialResults={initialResults} query={query} />
        ) : (
          <RepoResults initialResults={initialResults} query={query} />
        ))}
    </main>
  );
}
