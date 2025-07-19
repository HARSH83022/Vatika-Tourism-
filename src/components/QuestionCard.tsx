import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Question } from '../types';
import { addFeedback } from '../services/firebaseService';

interface QuestionCardProps {
  question: Question;
  language: 'english' | 'hindi';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'not_helpful' | null>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const handleFeedback = async (rating: 'helpful' | 'not_helpful') => {
    if (isSubmittingFeedback || feedback) return;
    
    setIsSubmittingFeedback(true);
    try {
      await addFeedback({
        questionId: question.id,
        rating,
        timestamp: new Date()
      });
      setFeedback(rating);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const displayQuestion = language === 'hindi' && question.questionHindi 
    ? question.questionHindi 
    : question.question;
  
  const displayAnswer = language === 'hindi' && question.answerHindi 
    ? question.answerHindi 
    : question.answer;

  const getDomainColor = (domain: string) => {
    const colors: { [key: string]: string } = {
      kund: 'bg-blue-100 text-blue-800',
      temple: 'bg-orange-100 text-orange-800',
      aarti: 'bg-yellow-100 text-yellow-800',
      food: 'bg-green-100 text-green-800',
      cruise: 'bg-cyan-100 text-cyan-800',
      toilet: 'bg-purple-100 text-purple-800',
    };
    return colors[domain] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDomainColor(question.domain)}`}>
            {question.domain.charAt(0).toUpperCase() + question.domain.slice(1)}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-orange-600 transition-colors"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer" 
            onClick={() => setIsExpanded(!isExpanded)}>
          {displayQuestion}
        </h3>
        
        {!isExpanded && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {displayAnswer.substring(0, 100)}...
          </p>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-800 leading-relaxed">{displayAnswer}</p>
          </div>
          
          {/* Feedback Section */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {language === 'hindi' ? 'क्या यह उत्तर सहायक था?' : 'Was this answer helpful?'}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleFeedback('helpful')}
                disabled={isSubmittingFeedback || feedback !== null}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  feedback === 'helpful'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{language === 'hindi' ? 'हाँ' : 'Yes'}</span>
              </button>
              <button
                onClick={() => handleFeedback('not_helpful')}
                disabled={isSubmittingFeedback || feedback !== null}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  feedback === 'not_helpful'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{language === 'hindi' ? 'नहीं' : 'No'}</span>
              </button>
            </div>
          </div>
          
          {feedback && (
            <p className="text-sm text-green-600 mt-2">
              {language === 'hindi' ? 'धन्यवाद! आपकी प्रतिक्रिया दर्ज की गई है।' : 'Thank you! Your feedback has been recorded.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;