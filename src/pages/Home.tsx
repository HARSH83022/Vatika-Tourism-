import React, { useState, useEffect } from 'react';
import { MapPin, Users, Star, Clock, Sparkles, Award, Globe, Heart, ArrowRight, Play, Camera, Compass, Sun, Moon } from 'lucide-react';
import SearchBox from '../components/SearchBox';
import DomainFilter from '../components/DomainFilter';
import QuestionCard from '../components/QuestionCard';
import { Question } from '../types';
import { queryDeepSeek } from '../services/deepseekApi';
import { addDeepSeekLog, getQuestions } from '../services/firebaseService';
import qaData from '../data/qaData.json';


const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchResults, setSearchResults] = useState<Question[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadAllQuestions();
  }, []);

  useEffect(() => {
    if (selectedDomain === 'all') {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(q => q.domain === selectedDomain));
    }
  }, [selectedDomain, questions]);

  const loadAllQuestions = async () => {
    try {
      const localQuestions = qaData.questions.map(q => ({
        ...q,
        timestamp: new Date()
      }));

      const firebaseQuestions = await getQuestions();
      const allQuestions = [...localQuestions, ...firebaseQuestions];
      setQuestions(allQuestions);
      setFilteredQuestions(allQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
      const localQuestions = qaData.questions.map(q => ({
        ...q,
        timestamp: new Date()
      }));
      setQuestions(localQuestions);
      setFilteredQuestions(localQuestions);
    }
  };

  const handleSearch = async (query: string, searchLanguage: 'english' | 'hindi') => {
    setIsSearching(true);
    setLanguage(searchLanguage);
    setHasSearched(true);

    try {
      const localResults = questions.filter(q => {
        const questionText = searchLanguage === 'hindi' && q.questionHindi ? q.questionHindi : q.question;
        const answerText = searchLanguage === 'hindi' && q.answerHindi ? q.answerHindi : q.answer;
        return questionText.toLowerCase().includes(query.toLowerCase()) ||
               answerText.toLowerCase().includes(query.toLowerCase());
      });

      if (localResults.length > 0) {
        setSearchResults(localResults);
      } else {
        try {
          const aiResponse = await queryDeepSeek(query, searchLanguage);
          
          await addDeepSeekLog({
            query,
            response: aiResponse,
            timestamp: new Date(),
            language: searchLanguage
          });

          const aiQuestion: Question = {
            id: `ai-${Date.now()}`,
            domain: 'ai-generated',
            question: query,
            answer: aiResponse,
            lang: searchLanguage,
            timestamp: new Date()
          };

          setSearchResults([aiQuestion]);
        } catch (error) {
          console.error('Error querying AI:', error);
          setSearchResults([]);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const stats = [
    { icon: MapPin, label: 'Sacred Places', labelHindi: 'पवित्र स्थान', value: '100+', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Happy Tourists', labelHindi: 'खुश पर्यटक', value: '50K+', color: 'from-green-500 to-emerald-500' },
    { icon: Star, label: 'Rating', labelHindi: 'रेटिंग', value: '4.9', color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, label: 'Years Experience', labelHindi: 'वर्षों का अनुभव', value: '10+', color: 'from-purple-500 to-pink-500' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Answers',
      titleHindi: 'AI संचालित उत्तर',
      description: 'Get instant answers about Varanasi using advanced AI technology',
      descriptionHindi: 'उन्नत AI तकनीक का उपयोग करके वाराणसी के बारे में तुरंत उत्तर प्राप्त करें',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      titleHindi: 'बहुभाषी समर्थन',
      description: 'Available in both Hindi and English for your convenience',
      descriptionHindi: 'आपकी सुविधा के लिए हिंदी और अंग्रेजी दोनों में उपलब्ध',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      titleHindi: 'विशेषज्ञ मार्गदर्शन',
      description: 'Curated information from local experts and experienced travelers',
      descriptionHindi: 'स्थानीय विशेषज्ञों और अनुभवी यात्रियों से संकलित जानकारी',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const highlights = [
    {
      icon: Sun,
      title: 'Morning Ganga Aarti',
      titleHindi: 'प्रातःकालीन गंगा आरती',
      time: '5:30 AM',
      image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Camera,
      title: 'Boat Ride Experience',
      titleHindi: 'नाव सवारी अनुभव',
      time: 'Sunrise & Sunset',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Compass,
      title: 'Temple Exploration',
      titleHindi: 'मंदिर अन्वेषण',
      time: 'All Day',
      image: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-orange-800 text-sm font-medium mb-8 shadow-lg border border-orange-200">
            <Sparkles className="h-5 w-5 mr-2 text-orange-600" />
            Discover the Spiritual Capital of India
            <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
          </div>

          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-tight">
              Welcome to{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  VATIKA
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 rounded-full"></div>
              </span>
            </h1>
            
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                Tourism
              </h2>
              <p className="text-3xl md:text-4xl text-orange-600 font-bold mb-6">
                वाराणसी की आध्यात्मिक यात्रा में आपका स्वागत है
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
            Discover the spiritual heart of India with our AI-powered guide. Get instant answers about ghats, temples, 
            food, and everything Varanasi has to offer in both Hindi and English.
          </p>

          {/* Search Section */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>
            <div className="relative p-8">
              <SearchBox onSearch={handleSearch} isLoading={isSearching} />
            </div>
          </div>

          {/* Domain Filter */}
          <DomainFilter selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} />

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Experience Varanasi
            </h2>
            <p className="text-2xl text-gray-300">
              वाराणसी का अनुभव करें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                      <Icon className="h-12 w-12 text-orange-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-orange-300 text-sm font-medium bg-orange-500/20 px-3 py-1 rounded-full">
                        {highlight.time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-100 transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    <p className="text-orange-200 text-lg">
                      {highlight.titleHindi}
                    </p>
                    <div className="mt-6 flex items-center text-orange-300 group-hover:text-white transition-colors duration-300">
                      <Play className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Explore Now</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-orange-800 text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Why Choose VATIKA Tourism?
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Your Perfect Travel Companion
            </h2>
            <p className="text-2xl text-orange-600 font-semibold">
              VATIKA Tourism क्यों चुनें?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-orange-600 font-semibold mb-4">
                      {feature.titleHindi}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {feature.descriptionHindi}
                    </p>
                    <div className="mt-6 flex items-center text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                      <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="text-sm font-medium">Learn More</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;100&quot; viewBox=&quot;0 0 100 100&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;white&quot; fill-opacity=&quot;0.1&quot;%3E%3Cpolygon points=&quot;50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40&quot;/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-orange-100">
              हजारों लोगों का भरोसा
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:bg-white/30 transition-all duration-500"></div>
                    <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-white/90 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-orange-200">
                    {stat.labelHindi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasSearched ? (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {language === 'hindi' ? 'खोज परिणाम' : 'Search Results'}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
              </div>
              {searchResults.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((question) => (
                    <QuestionCard key={question.id} question={question} language={language} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-8">
                    <MapPin className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'hindi' ? 'कोई परिणाम नहीं मिला' : 'No Results Found'}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {language === 'hindi' 
                      ? 'कृपया अपनी खोज को संशोधित करें या अलग कीवर्ड का प्रयास करें।'
                      : 'Please try modifying your search or use different keywords.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Popular Questions
                </h2>
                <p className="text-2xl text-orange-600 font-semibold mb-6">
                  लोकप्रिय प्रश्न
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
              </div>
              {filteredQuestions.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredQuestions.slice(0, 9).map((question) => (
                    <QuestionCard key={question.id} question={question} language={language} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No questions available for this category.</p>
                </div>
              )}
              
              {filteredQuestions.length > 9 && (
                <div className="text-center mt-16">
                  <a
                    href="/explorer"
                    className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    View All Questions
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;white&quot; fill-opacity=&quot;0.1&quot;%3E%3Cpath d=&quot;M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z&quot;/&gt;%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
              <Heart className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Explore
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Varanasi?
            </span>
          </h2>
          
          <p className="text-3xl text-blue-100 mb-16 font-semibold">
            वाराणसी की खोज के लिए तैयार हैं?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a
              href="/map"
              className="group bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
            >
              🗺️ Explore Map
              <span className="ml-2 text-lg">नक्शा देखें</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="/events"
              className="group border-3 border-white text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              🎉 View Events
              <span className="ml-2 text-lg">कार्यक्रम देखें</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;