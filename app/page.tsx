import SearchForm, { SearchType } from "./components/SearchForm";
import UserResults from "./components/UserResults";
import RepoResults from "./components/RepoResults";

import { searchGitHub } from "./utils/github";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = searchParams.type as SearchType;
  const query = searchParams.q as string;
  const page = Number(searchParams.page) || 1;

  let searchResults = null;
  if (query) {
    try {
      searchResults = await searchGitHub(type, query, page);
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error (e.g., display error message to user)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">GitHub Search</h1>
      <SearchForm />
      {searchResults &&
        (type === "users" ? (
          <UserResults results={searchResults} />
        ) : (
          <RepoResults results={searchResults} />
        ))}
    </main>
  );
}
