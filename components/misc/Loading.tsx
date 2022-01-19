const Loading = () => (
    <div className="flex flex-col items-center justify-center h-auto w-auto">
      <div className="w-full max-w-md">
        <div className="card w-auto h-auto shadow bg-gray-800 m-2">
          <div className="card-body">
            <div className="card-title grid grid-cols-2 w-full">
              <span>Loading...</span>
              <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
            </div>
            <span>The page is loading, be patient please.</span>
          </div>
        </div>
      </div>
    </div>
);

export default Loading