export default function RepoResultsSkeleton() {
  return (
    <div className="mt-8 w-full max-w-4xl">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
