export default function UserResultsSkeleton() {
  return (
    <div className="mt-8 w-full max-w-4xl">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
