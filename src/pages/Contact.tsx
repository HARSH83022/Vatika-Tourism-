import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            संपर्क करें
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about Varanasi or need assistance with your travel plans? 
            We're here to help you explore the spiritual capital of India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Get in Touch / संपर्क में रहें
            </h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 mb-2">Send us an email anytime</p>
                  <a 
                    href="mailto:harshmishra83022@gmail.com"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    harshmishra83022@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">LinkedIn</h3>
                  <p className="text-gray-600 mb-2">Connect with us professionally</p>
                  <a 
                    href="https://www.linkedin.com/in/harsh-mishra-5a5031266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600 mb-2">Based in the holy city</p>
                  <p className="text-gray-700">Varanasi, Uttar Pradesh, India</p>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Emergency Contacts</h3>
                  <p className="text-gray-600 mb-2">Important numbers for tourists</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>Police: 100</p>
                    <p>Fire: 101</p>
                    <p>Ambulance: 108</p>
                    <p>Tourist Helpline: 1363</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tourism Information */}
            <div className="mt-12 p-6 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Tourism Information / पर्यटन जानकारी
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Best Time to Visit:</strong> October to March</p>
                <p><strong>Airport:</strong> Lal Bahadur Shastri Airport (VNS)</p>
                <p><strong>Railway Station:</strong> Varanasi Junction (BSB)</p>
                <p><strong>Languages:</strong> Hindi, English, Bhojpuri</p>
                <p><strong>Currency:</strong> Indian Rupee (INR)</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message / संदेश भेजें
              </h2>

              {/* Success Message */}
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h3 className="text-green-800 font-medium">Message Sent!</h3>
                      <p className="text-green-700 text-sm">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name / नाम *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email / ईमेल *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject / विषय *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message / संदेश *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message / संदेश भेजें
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions / अक्सर पूछे जाने वाले प्रश्न
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                What is the best time to visit Varanasi?
              </h3>
              <p className="text-gray-600 text-sm">
                The best time to visit Varanasi is from October to March when the weather is pleasant and comfortable for sightseeing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                How can I book a boat ride on the Ganges?
              </h3>
              <p className="text-gray-600 text-sm">
                You can book boat rides directly at the ghats. Prices range from ₹100-500 depending on duration and type of boat.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is it safe for solo travelers?
              </h3>
              <p className="text-gray-600 text-sm">
                Varanasi is generally safe for solo travelers. However, it's advisable to stay alert, especially in crowded areas and during night time.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                What should I wear when visiting temples?
              </h3>
              <p className="text-gray-600 text-sm">
                Dress modestly when visiting temples. Cover your shoulders and legs. Remove shoes before entering temple premises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;