const GITHUB_API_URL = "https://api.github.com";

export async function searchGitHub(
  type: "users" | "repos",
  query: string,
  page: number = 1
) {
  const endpoint = type === "users" ? "search/users" : "search/repositories";
  const url = `${GITHUB_API_URL}/${endpoint}?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=5`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.text-match+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from GitHub API");
  }

  return response.json();
}
