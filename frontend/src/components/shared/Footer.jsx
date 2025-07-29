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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                JobPortal
              </h1>
            </button>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting exceptional talent with outstanding opportunities. Your gateway to career success and professional growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/browse')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Find Jobs</span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Home</span>
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/browse')}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <Users className="w-4 h-4 text-green-400" />
                <span>For Job Seekers</span>
              </button>
              <button 
                onClick={() => navigate('/browse')}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>Browse Jobs</span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <Award className="w-4 h-4 text-yellow-400" />
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group w-full text-left"
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Home</span>
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-red-400" />
                <span>support@jobportal.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Get the latest job opportunities and career insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
