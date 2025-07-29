import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Building2,
  Users,
  Briefcase,
  Award
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                JobPortal
              </h1>
            </button>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting exceptional talent with outstanding opportunities. Your gateway to career success and professional growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/sarthakpaliwal2/" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://github.com/Sarthak-Paliwal" className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Github className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/jobs')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Browse Jobs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/browse')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Search Jobs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  My Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">contact@jobportal.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">+91 9876543211</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-sm text-gray-300">Jagatpura, Jaipur</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 JobPortal. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
