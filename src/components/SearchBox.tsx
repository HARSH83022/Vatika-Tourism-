import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, Loader2 } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string, language: 'english' | 'hindi') => void;
  isLoading?: boolean;
  placeholder?: string;
  placeholderHindi?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  onSearch, 
  isLoading = false, 
  placeholder = "Ask anything about Varanasi...",
  placeholderHindi = "वाराणसी के बारे में कुछ भी पूछें..."
}) => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), language);
    }
  };

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Language Toggle */}
      <div className="flex justify-center mb-4">
        <div className="bg-white rounded-full p-1 shadow-md">
          <button
            onClick={() => setLanguage('english')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              language === 'english'
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hindi')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              language === 'hindi'
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'hindi' ? placeholderHindi : placeholder}
            className="w-full px-6 py-4 pr-24 text-lg border-2 border-orange-200 rounded-full focus:outline-none focus:border-orange-500 shadow-lg"
            disabled={isLoading}
          />
          
          {/* Voice Input Button */}
          {recognition && (
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-16 p-2 rounded-full transition-colors ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
              }`}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
          
          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>

      {/* Voice Recognition Status */}
      {isListening && (
        <div className="text-center mt-2">
          <span className="text-orange-600 text-sm font-medium">
            {language === 'hindi' ? 'सुन रहा हूँ...' : 'Listening...'}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBox;