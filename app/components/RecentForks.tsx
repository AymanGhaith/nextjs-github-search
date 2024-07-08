"use client";

import { useEffect, useState } from "react";

interface Fork {
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

interface RecentForksProps {
  forksUrl: string;
}

export default function RecentForks({ forksUrl }: RecentForksProps) {
  const [recentForks, setRecentForks] = useState<Fork[]>([]);

  useEffect(() => {
    async function fetchRecentForks() {
      try {
        const response = await fetch(`${forksUrl}?per_page=3&sort=newest`);
        if (!response.ok) throw new Error("Failed to fetch forks");
        const data = await response.json();
        setRecentForks(data);
      } catch (error) {
        console.error("Error fetching recent forks:", error);
      }
    }

    fetchRecentForks();
  }, [forksUrl]);

  return (
    <div className="mt-2">
      <h4 className="font-semibold">Recent Forks:</h4>
      <div className="flex space-x-2 mt-1">
        {recentForks.map((fork) => (
          <a
            key={fork.owner.login}
            href={fork.owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <img
              src={fork.owner.avatar_url}
              alt={fork.owner.login}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-xs mt-1">{fork.owner.login}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
