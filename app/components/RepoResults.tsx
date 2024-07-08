import { StarIcon } from "@heroicons/react/24/solid";

import LanguageBadges from "./LanguageBadges";
import RecentForks from "./RecentForks";

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
  results: {
    items: Repo[];
    total_count: number;
  };
}

export default function RepoResults({ results }: RepoResultsProps) {
  return (
    <div className="mt-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">
        Repositories Found: {results.total_count}
      </h2>
      <div className="space-y-6">
        {results.items.map((repo) => (
          <div
            key={repo.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <h3 className="font-bold text-xl">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {repo.full_name}
                  </a>
                </h3>
                {repo.language && (
                  <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                    {repo.language}
                  </span>
                )}
              </div>
              <span className="flex items-center text-yellow-600">
                <StarIcon className="w-5 h-5 mr-1" />
                {repo.stargazers_count}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{repo.description}</p>
            <RecentForks forksUrl={repo.forks_url} />
            <hr className="my-4 border-gray-200" />
            <LanguageBadges languagesUrl={repo.languages_url} />
          </div>
        ))}
      </div>
    </div>
  );
}
