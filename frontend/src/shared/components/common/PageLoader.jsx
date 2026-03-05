const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading HireNexon...</p>
      </div>
    </div>
  );
};

export default PageLoader;