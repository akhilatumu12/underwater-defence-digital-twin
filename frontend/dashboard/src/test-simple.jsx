import React from 'react';

function TestSimple() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🌊 Underwater Defence Digital Twin
        </h1>
        <div className="text-green-400 text-xl">
          System Loading Successfully!
        </div>
        <div className="text-gray-400 mt-4">
          If you see this, the frontend is working.
        </div>
        <div className="mt-8">
          <a 
            href="http://localhost:3000" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Main App
          </a>
        </div>
      </div>
    </div>
  );
}

export default TestSimple;
