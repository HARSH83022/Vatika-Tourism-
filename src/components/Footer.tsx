import React from 'react';
import { MapPin, Mail, Linkedin, Phone, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">VATIKA Tourism</h3>
            <p className="text-gray-300 mb-4">
              Your trusted guide to exploring the spiritual and cultural heritage of Varanasi. 
              Discover the ancient ghats, sacred temples, and vibrant culture of the eternal city.
            </p>
            <p className="text-gray-300 text-sm">
              वाराणसी की आध्यात्मिक और सांस्कृतिक विरासत की खोज के लिए आपका विश्वसनीय गाइड।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="/explorer" className="text-gray-300 hover:text-orange-400 transition-colors">Q&A Explorer</a></li>
              <li><a href="/map" className="text-gray-300 hover:text-orange-400 transition-colors">Map</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-orange-400 transition-colors">Events</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <a 
                  href="mailto:harshmishra83022@gmail.com" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  harshmishra83022@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-orange-400" />
                <a 
                  href="https://www.linkedin.com/in/harsh-mishra-5a5031266" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">Varanasi, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 VATIKA Tourism. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-gray-400 text-sm">for Varanasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;