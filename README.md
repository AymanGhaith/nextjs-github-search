# GitHub Search App

This Next.js application allows users to search for GitHub users and repositories.

## Table of Contents

- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [API Usage](#api-usage)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Setup

To set up this project locally, follow these steps:

1. Clone the repository:

```
   git clone https://github.com/AymanGhaith/nextjs-github-search.git
   cd github-search-app
```

2. Install dependencies:

```
   pnpm install
```

3. Install additional development dependencies:

```
   pnpm add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-node @types/jest @types/node
```

4. Create a `jest.config.ts` file in the root directory:

```typescript
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
};

export default createJestConfig(config);
```

5. Create a jest.setup.ts file in the root directory:

```
import '@testing-library/jest-dom'
```

6. Update your package.json to include test scripts:

```json

"scripts": {
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
}
```

## Running the Application

To run the application in development mode:

```
pnpm run dev
```

The application will be available at http://localhost:3000.
To build and run the application in production mode:

```
pnpm run build
pnpm start
```

## Running Tests

To run all tests once:

```
pnpm run test
```

To run tests with coverage report:

```
pnpm run test:coverage
```

## Project Structure

The project structure is as follows:

```
github-search-app/
├── app/
│ ├── components/
│ │ ├── ErrorMessage.tsx
│ │ ├── InfiniteScroll.tsx
│ │ ├── LanguageBadges.tsx
│ │ ├── RecentForks.tsx
│ │ ├── RepoCard.tsx
│ │ ├── RepoResults.tsx
│ │ ├── RepoResultsSkeleton.tsx
│ │ ├── SearchForm.tsx
│ │ ├── UserCard.tsx
│ │ ├── UserResults.tsx
│ │ └── UserResultsSkeleton.tsx
│ ├── utils/
│ │ └── github.ts
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── public/
├── .env.local
├── .gitignore
├── jest.config.ts
├── jest.setup.ts
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## API Usage

The application uses the GitHub API to search for users and repositories. The searchGitHub function in app/utils/github.ts handles these API calls.
Example API calls:

Search for users:
GET https://api.github.com/search/users?q=username

Search for repositories:
GET https://api.github.com/search/repositories?q=repository_name

## Learn More

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
