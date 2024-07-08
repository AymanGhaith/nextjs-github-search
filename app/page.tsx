import SearchForm, { SearchType } from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
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
      console.log(searchResults.items.length);
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error (e.g., display error message to user)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">GitHub Search</h1>
      <SearchForm />
      {searchResults && <SearchResults results={searchResults} />}
    </main>
  );
}
