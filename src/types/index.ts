export interface Question {
  id: string;
  domain: string;
  question: string;
  questionHindi?: string;
  answer: string;
  answerHindi?: string;
  lang: 'english' | 'hindi' | 'both';
  timestamp?: Date;
  approved?: boolean;
}

export interface UserSubmission {
  id?: string;
  question: string;
  answer: string;
  domain: string;
  lang: 'english' | 'hindi';
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
}

export interface Feedback {
  id?: string;
  questionId: string;
  rating: 'helpful' | 'not_helpful';
  timestamp: Date;
  userIP?: string;
}

export interface Event {
  id?: string;
  title: string;
  titleHindi?: string;
  date: Date;
  description: string;
  descriptionHindi?: string;
  location?: string;
}

export interface DeepSeekLog {
  id?: string;
  query: string;
  response: string;
  userIP?: string;
  timestamp: Date;
  language: 'english' | 'hindi';
}

export interface Location {
  id: string;
  name: string;
  nameHindi: string;
  type: 'ghat' | 'temple' | 'market' | 'restaurant';
  lat: number;
  lng: number;
  description: string;
  descriptionHindi: string;
}