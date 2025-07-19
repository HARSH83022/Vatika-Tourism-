const DEEPSEEK_API_KEY = 'ef2ac1eb799436c1187b0e9f4ebd2bef';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const queryDeepSeek = async (question: string, language: 'english' | 'hindi' = 'english'): Promise<string> => {
  try {
    const prompt = language === 'hindi' 
      ? `आप वाराणसी, भारत के लिए एक पर्यटन सहायक हैं। कृपया इस प्रश्न का उत्तर हिंदी में दें: ${question}`
      : `You are a tourism assistant for Varanasi, India. Please answer this question in English: ${question}`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: language === 'hindi' 
              ? 'आप वाराणसी के लिए एक सहायक पर्यटन गाइड हैं। घाट, मंदिर, भोजन, और स्थानीय संस्कृति के बारे में सटीक जानकारी प्रदान करें।'
              : 'You are a helpful tourism guide for Varanasi. Provide accurate information about ghats, temples, food, and local culture.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('Failed to get response from AI assistant');
  }
};