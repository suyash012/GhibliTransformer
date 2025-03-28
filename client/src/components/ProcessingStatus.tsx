export function ProcessingStatus() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">Transforming your image...</h3>
      <p className="text-gray-500 mb-6">Please wait while we apply the Ghibli magic</p>
      <div className="max-w-md w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-primary h-2.5 rounded-full w-3/4 animate-pulse"></div>
      </div>
      <p className="text-sm text-gray-400 mt-3">This might take a minute or two</p>
    </div>
  );
}
