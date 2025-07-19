import React, { useState } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import { addUserSubmission } from '../services/firebaseService';

const AddQA: React.FC = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    domain: 'kund',
    lang: 'english' as 'english' | 'hindi'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const domains = [
    { id: 'kund', name: 'Ghats', nameHindi: 'घाट' },
    { id: 'temple', name: 'Temples', nameHindi: 'मंदिर' },
    { id: 'aarti', name: 'Aarti', nameHindi: 'आरती' },
    { id: 'food', name: 'Food', nameHindi: 'भोजन' },
    { id: 'cruise', name: 'Boat Rides', nameHindi: 'नाव सवारी' },
    { id: 'toilet', name: 'Facilities', nameHindi: 'सुविधाएं' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    setIsSubmitting(true);
    try {
      await addUserSubmission({
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        domain: formData.domain,
        lang: formData.lang,
        status: 'pending',
        timestamp: new Date()
      });

      setIsSubmitted(true);
      setFormData({
        question: '',
        answer: '',
        domain: 'kund',
        lang: 'english'
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting Q&A:', error);
      alert('Error submitting your question. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <Plus className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Add Question & Answer
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            प्रश्न और उत्तर जोड़ें
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help fellow tourists by sharing your knowledge about Varanasi. Your submission will be reviewed before being published.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h3 className="text-green-800 font-medium">Submission Successful!</h3>
                <p className="text-green-700 text-sm">
                  Your question has been submitted for admin review and will appear in the Q&A Explorer once approved. Thank you for contributing to VATIKA Tourism!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Language / भाषा
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="lang"
                    value="english"
                    checked={formData.lang === 'english'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">English</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="lang"
                    value="hindi"
                    checked={formData.lang === 'hindi'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">हिंदी</span>
                </label>
              </div>
            </div>

            {/* Domain Selection */}
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                Category / श्रेणी
              </label>
              <select
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name} / {domain.nameHindi}
                  </option>
                ))}
              </select>
            </div>

            {/* Question */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Question / प्रश्न *
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder={formData.lang === 'hindi' ? 'अपना प्रश्न यहाँ लिखें...' : 'Enter your question here...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {/* Answer */}
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Answer / उत्तर *
              </label>
              <textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={6}
                placeholder={formData.lang === 'hindi' ? 'विस्तृत उत्तर प्रदान करें...' : 'Provide a detailed answer...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Submission Guidelines:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Provide accurate and helpful information</li>
                <li>• Be respectful and considerate</li>
                <li>• Include specific details when possible</li>
                <li>• Your submission will be reviewed before publication</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !formData.question.trim() || !formData.answer.trim()}
                className="bg-orange-600 text-white px-8 py-3 rounded-md font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  formData.lang === 'hindi' ? 'जमा करें' : 'Submit'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Want to explore existing questions? <a href="/explorer" className="text-orange-600 hover:text-orange-700 font-medium">Visit our Q&A Explorer</a> | 
            <a href="/" className="text-orange-600 hover:text-orange-700 font-medium ml-2">Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddQA;