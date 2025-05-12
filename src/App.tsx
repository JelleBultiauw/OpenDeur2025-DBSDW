import React, { useState, useEffect } from 'react';
import Roadmap from './components/Roadmap';

interface AppIdea {
  id: string;
  text: string;
  timestamp: string;
}

function App() {
  const [showAll, setShowAll] = useState(false);
  const [appIdea, setAppIdea] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);
  const [ideas, setIdeas] = useState<AppIdea[]>([]);

  // Load saved app ideas from localStorage on component mount
  useEffect(() => {
    const savedIdeas = localStorage.getItem('appIdeas');
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas));
    }
  }, []);

  const handleAppIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIdea: AppIdea = {
      id: Date.now().toString(),
      text: appIdea,
      timestamp: new Date().toLocaleString('nl-NL')
    };
    
    const updatedIdeas = [...ideas, newIdea];
    setIdeas(updatedIdeas);
    localStorage.setItem('appIdeas', JSON.stringify(updatedIdeas));
    setAppIdea('');
    setShowInput(false);
  };

  const deleteIdea = (id: string) => {
    const updatedIdeas = ideas.filter(idea => idea.id !== id);
    setIdeas(updatedIdeas);
    localStorage.setItem('appIdeas', JSON.stringify(updatedIdeas));
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setShowInput(!showInput)}
              className="px-6 py-2 rounded-full bg-white bg-opacity-10 text-white text-sm font-medium hover:bg-opacity-20 transition-all border border-white border-opacity-20"
            >
              Heb jij een app idee?
            </button>
            <button
              onClick={() => setShowIdeas(!showIdeas)}
              className="px-6 py-2 rounded-full bg-white bg-opacity-10 text-white text-sm font-medium hover:bg-opacity-20 transition-all border border-white border-opacity-20"
            >
              Bekijk alle ideeën ({ideas.length})
            </button>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full bg-white bg-opacity-10 text-white text-sm font-medium hover:bg-opacity-20 transition-all border border-white border-opacity-20"
          >
            {showAll ? 'Hide Nodes' : 'Show All'}
          </button>
        </div>
      </header>
      
      {/* App Idea Input Modal */}
      {showInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Deel je app idee!</h2>
            <form onSubmit={handleAppIdeaSubmit}>
              <textarea
                value={appIdea}
                onChange={(e) => setAppIdea(e.target.value)}
                className="w-full h-32 p-2 bg-gray-800 rounded border border-gray-700 text-white mb-4"
                placeholder="Beschrijf je app idee hier..."
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-white text-black hover:bg-gray-200"
                >
                  Opslaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View All Ideas Modal */}
      {showIdeas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Alle ingediende ideeën</h2>
              <button
                onClick={() => setShowIdeas(false)}
                className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
              >
                Sluiten
              </button>
            </div>
            {ideas.length === 0 ? (
              <p className="text-gray-400">Nog geen ideeën ingediend.</p>
            ) : (
              <div className="space-y-4">
                {ideas.map((idea) => (
                  <div key={idea.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-400 mb-2">{idea.timestamp}</p>
                      <button
                        onClick={() => deleteIdea(idea.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Verwijderen
                      </button>
                    </div>
                    <p className="text-white">{idea.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
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