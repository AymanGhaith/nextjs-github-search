const GITHUB_API_URL = "https://api.github.com";

export async function searchGitHub(
  type: "users" | "repos",
  query: string,
  page: number = 1
) {
  const endpoint = type === "users" ? "search/users" : "search/repositories";
  const url = `${GITHUB_API_URL}/${endpoint}?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=10`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.text-match+json",
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Please try again later."
      );
    }
    throw new Error("Failed to fetch from GitHub API");
  }

  return response.json();
}
