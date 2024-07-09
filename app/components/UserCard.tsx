"use client";

interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex items-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h3 className="font-bold text-xl text-blue-700">{user.login}</h3>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
