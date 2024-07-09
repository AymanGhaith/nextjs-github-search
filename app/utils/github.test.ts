import { searchGitHub } from "./github";

global.fetch = jest.fn();

describe("searchGitHub", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("fetches data from GitHub API", async () => {
    const mockResponse = { items: [], total_count: 0 };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await searchGitHub("users", "test");
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("throws an error when API request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(searchGitHub("users", "test")).rejects.toThrow(
      "Failed to fetch from GitHub API"
    );
  });
});
