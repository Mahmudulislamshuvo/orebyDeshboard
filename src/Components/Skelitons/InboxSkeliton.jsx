const InboxSkeleton = () => {
  return (
    <div className="w-full bg-white shadow-xl rounded-lg flex overflow-x-auto">
      {/* Sidebar skeleton */}
      <div className="w-[30%] px-4 border-r border-gray-300">
        <div className="px-2 pt-4 pb-8 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-12 rounded-md flex items-center justify-between px-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full blink" />
                <div className="w-24 h-4 bg-gray-300 rounded-md blink" />
              </div>
              <div className="w-12 h-3 bg-gray-300 rounded-md blink" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-4 animate-pulse">
          <div className="w-32 h-6 bg-gray-300 rounded-md blink" />
          <div className="w-40 h-4 bg-gray-200 rounded-md blink" />
          <div className="mt-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full h-4 bg-gray-200 rounded-md blink"
              />
            ))}
          </div>

          {/* Reply Box Skeleton */}
          <div className="mt-8">
            <div className="w-full h-[200px] bg-gray-200 rounded-md shadow-md blink" />
            <div className="mt-4 w-32 h-10 bg-blue-300 rounded-md blink" />
          </div>
        </div>
      </div>

      <style>
        {`
          .blink {
            animation: blink 1.4s infinite;
          }
          @keyframes blink {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
};

export default InboxSkeleton;
