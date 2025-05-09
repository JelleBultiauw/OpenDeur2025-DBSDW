import React, { useState } from 'react';
import Roadmap from './components/Roadmap';

function App() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-end">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full bg-white bg-opacity-10 text-white text-sm font-medium hover:bg-opacity-20 transition-all border border-white border-opacity-20"
          >
            {showAll ? 'Hide Nodes' : 'Show All'}
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-4">
        <div className="h-full rounded-lg border border-gray-800 overflow-hidden relative">
          <Roadmap showAll={showAll} onShowAllChange={setShowAll} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="p-4 border-t border-gray-800 text-center text-gray-600 text-sm">
        <p>© 2025 School Project Roadmap</p>
      </footer>
    </div>
  );
}

export default App;