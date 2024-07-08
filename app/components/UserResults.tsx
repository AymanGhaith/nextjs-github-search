import { SearchType } from "./SearchForm";

// TODO: This should replaced once integrated with Github
interface SearchResultsProps {
  results: {
    type: SearchType;
    query: string;
    items: any[];
  };
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Users Search Results for {results.type}: {results.query}
      </h2>
      {/* TODO: Implement actual results loop */}
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
