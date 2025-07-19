import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DomainFilter from '../components/DomainFilter';
import QuestionCard from '../components/QuestionCard';
import { Question } from '../types';
import { getQuestions } from '../services/firebaseService';
import qaData from '../data/qaData.json';

const Explorer: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [selectedDomain, searchQuery, questions, language]);

  const loadQuestions = async () => {
    try {
      // Load questions from JSON file
      const localQuestions = qaData.questions.map(q => ({
        ...q,
        timestamp: new Date()
      }));

      // Load questions from Firebase
      const firebaseQuestions = await getQuestions();
      
      // Combine all questions
      const allQuestions = [...localQuestions, ...firebaseQuestions];
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
      // Fallback to JSON data only
      const localQuestions = qaData.questions.map(q => ({
        ...q,
        timestamp: new Date()
      }));
      setQuestions(localQuestions);
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    // Filter by domain
    if (selectedDomain !== 'all') {
      filtered = filtered.filter(q => q.domain === selectedDomain);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(q => {
        const questionText = language === 'hindi' && q.questionHindi ? q.questionHindi : q.question;
        const answerText = language === 'hindi' && q.answerHindi ? q.answerHindi : q.answer;
        return questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
               answerText.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredQuestions(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Question Explorer
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            प्रश्न अन्वेषक
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through all questions and answers about Varanasi. Use filters and search to find exactly what you're looking for.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setLanguage('english')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                language === 'english'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hindi')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                language === 'hindi'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hindi' ? 'प्रश्न खोजें...' : 'Search questions...'}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Domain Filter */}
        <DomainFilter selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} />

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {language === 'hindi' 
              ? `${filteredQuestions.length} प्रश्न मिले`
              : `${filteredQuestions.length} questions found`}
          </p>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} language={language} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'hindi' ? 'कोई प्रश्न नहीं मिला' : 'No questions found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'hindi' 
                ? 'अपनी खोज को संशोधित करने या फ़िल्टर बदलने का प्रयास करें।'
                : 'Try modifying your search or changing the filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('all');
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              {language === 'hindi' ? 'फ़िल्टर साफ़ करें' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;