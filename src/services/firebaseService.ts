import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question, UserSubmission, Feedback, Event, DeepSeekLog } from '../types';

// Questions Collection
export const addQuestion = async (question: Omit<Question, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'questions'), {
      ...question,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate()
    })) as Question[];
  } catch (error) {
    console.error('Error getting questions:', error);
    throw error;
  }
};

// User Submissions
export const addUserSubmission = async (submission: Omit<UserSubmission, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'user_submissions'), {
      ...submission,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding user submission:', error);
    throw error;
  }
};

// Feedback
export const addFeedback = async (feedback: Omit<Feedback, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'feedback'), {
      ...feedback,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

// Events
export const addEvent = async (event: Omit<Event, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      ...event,
      date: Timestamp.fromDate(event.date)
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate()
    })) as Event[];
  } catch (error) {
    console.error('Error getting events:', error);
    throw error;
  }
};

// DeepSeek Logs
export const addDeepSeekLog = async (log: Omit<DeepSeekLog, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'deepseek_logs'), {
      ...log,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding DeepSeek log:', error);
    throw error;
  }
};