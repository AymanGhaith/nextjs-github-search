"use client";

import { useEffect, useState } from "react";

interface LanguageBadgesProps {
  languagesUrl: string;
}

export default function LanguageBadges({ languagesUrl }: LanguageBadgesProps) {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await fetch(languagesUrl);
        if (!response.ok) throw new Error("Failed to fetch languages");
        const data = await response.json();
        setLanguages(Object.keys(data));
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    }

    fetchLanguages();
  }, [languagesUrl]);

  return (
    <div className="mt-2">
      {languages.map((lang) => (
        <span
          key={lang}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {lang}
        </span>
      ))}
    </div>
  );
}
