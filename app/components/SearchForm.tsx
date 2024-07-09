"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";

export type SearchType = "users" | "repos";

export default function SearchForm() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isError, setIsError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const defaultType = (searchParams.get("type") as SearchType) || "users";
  const defaultQuery = searchParams.get("q") || "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("searchType") as SearchType;
    const query = formData.get("query") as string;

    if (!/^[a-zA-Z0-9-_ ]+$/.test(query.trim())) {
      setIsError(true);
      toast.error(
        "Please enter a valid search query. Only letters, numbers, spaces, dashes, and underscores are allowed."
      );
      return;
    }

    setIsError(false);
    replace(`${pathname}?type=${type}&q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    if (formRef.current) {
      formRef.current.reset();
      setIsError(false);
      replace(pathname);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="searchType"
            value="users"
            defaultChecked={defaultType === "users"}
          />
          <span className="ml-2">Users</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="searchType"
            value="repos"
            defaultChecked={defaultType === "repos"}
          />
          <span className="ml-2">Repositories</span>
        </label>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          name="query"
          defaultValue={defaultQuery}
          placeholder="Search GitHub"
          className={clsx(
            "flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2",
            {
              "border-red-500 focus:ring-red-500": isError,
              "focus:ring-blue-500": !isError,
            }
          )}
          onChange={() => setIsError(false)}
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
