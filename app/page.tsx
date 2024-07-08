import SearchForm, { SearchType } from "./components/SearchForm";
import SearchResults from "./components/SearchResults";

async function searchGitHub(type: SearchType, query: string) {
  // TODO: Implement actual GitHub API call here
  // For now, we'll return a dummy result
  return { type, query, items: [] };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = searchParams.type as SearchType;
  const query = searchParams.q as string;

  let searchResults = null;
  if (type && query) {
    searchResults = await searchGitHub(type, query);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">GitHub Search</h1>
      <SearchForm />
      {searchResults && <SearchResults results={searchResults} />}
    </main>
  );
}
