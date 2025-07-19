import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MessageSquare, Calendar, TrendingUp, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getQuestions, getEvents } from '../services/firebaseService';
import { Question, Event } from '../types';
import qaData from '../data/qaData.json';

const Dashboard: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load questions from JSON and Firebase
      const localQuestions = qaData.questions.map(q => ({
        ...q,
        timestamp: new Date(),
        source: 'local'
      }));
      
      const firebaseQuestions = await getQuestions();
      const firebaseQuestionsWithSource = firebaseQuestions.map(q => ({
        ...q,
        source: 'firebase'
      }));
      
      const allQuestions = [...localQuestions, ...firebaseQuestionsWithSource];
      setQuestions(allQuestions);

      // Load events
      const eventsData = await getEvents();
      setEvents(eventsData);

      // Mock user submissions data (in real app, this would come from Firebase)
      setUserSubmissions([
        { id: '1', question: 'What is the best time to visit Kashi Vishwanath?', status: 'pending', timestamp: new Date() },
        { id: '2', question: 'How to book Ganga Aarti tickets?', status: 'approved', timestamp: new Date() },
        { id: '3', question: 'Best street food in Varanasi?', status: 'pending', timestamp: new Date() },
      ]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Questions',
      titleHindi: 'कुल प्रश्न',
      value: questions.length,
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'User Submissions',
      titleHindi: 'उपयोगकर्ता सबमिशन',
      value: userSubmissions.length,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Upcoming Events',
      titleHindi: 'आगामी कार्यक्रम',
      value: events.filter(e => e.date > new Date()).length,
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+3%'
    },
    {
      title: 'Total Views',
      titleHindi: 'कुल दृश्य',
      value: '15.2K',
      icon: Eye,
      color: 'bg-orange-500',
      change: '+25%'
    }
  ];

  const domainStats = questions.reduce((acc, q) => {
    acc[q.domain] = (acc[q.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VATIKA Tourism Dashboard
          </h1>
          <p className="text-gray-600">
            वाटिका पर्यटन डैशबोर्ड - Overview of your tourism platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.titleHindi}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Questions by Domain */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />
              Questions by Domain / डोमेन के अनुसार प्रश्न
            </h3>
            <div className="space-y-4">
              {Object.entries(domainStats).map(([domain, count]) => (
                <div key={domain} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">{domain}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(domainStats))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent User Submissions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Recent Submissions / हाल की सबमिशन
            </h3>
            <div className="space-y-4">
              {userSubmissions.slice(0, 5).map((submission) => (
                <div key={submission.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {submission.question}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {submission.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    submission.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Question Sources */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Question Sources / प्रश्न स्रोत
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Local JSON Data</span>
                <span className="text-sm font-bold text-gray-900">
                  {questions.filter(q => q.source === 'local').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">User Submissions</span>
                <span className="text-sm font-bold text-gray-900">
                  {questions.filter(q => q.source === 'firebase').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">AI Generated</span>
                <span className="text-sm font-bold text-gray-900">
                  {questions.filter(q => q.domain === 'ai-generated').length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions / त्वरित कार्य
            </h3>
            <div className="space-y-3">
              <a
                href="/add-qa"
                className="block w-full bg-orange-600 text-white text-center py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
              >
                Add New Q&A / नया प्रश्न जोड़ें
              </a>
              <a
                href="/events"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage Events / कार्यक्रम प्रबंधन
              </a>
              <a
                href="/explorer"
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                View All Q&A / सभी प्रश्न देखें
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Platform Overview / प्लेटफॉर्म अवलोकन
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <ThumbsUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">89%</p>
              <p className="text-sm text-gray-600">Positive Feedback</p>
              <p className="text-xs text-gray-500">सकारात्मक प्रतिक्रिया</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">2.5K</p>
              <p className="text-sm text-gray-600">Daily Visitors</p>
              <p className="text-xs text-gray-500">दैनिक आगंतुक</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">156</p>
              <p className="text-sm text-gray-600">Questions Answered</p>
              <p className="text-xs text-gray-500">उत्तरित प्रश्न</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;