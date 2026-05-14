import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!name || name.trim() === '') {
      setStatus('error');
      setMessage('Please enter your name');
      return;
    }
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Initialize EmailJS with your service ID, template ID, and public key
      // You'll need to replace these with your actual EmailJS credentials
      const templateParams = {
        name: name,
        email: email
      };

      await emailjs.send(
        'service_rgmefvg', // Replace with your EmailJS Service ID
        'template_4179dd2', // Replace with your EmailJS Template ID
        templateParams,
        'RepnMH8wE8bzSlRsO' // Replace with your EmailJS Public Key
      );

      setStatus('success');
      setMessage('Successfully subscribed! Check your email for confirmation.');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setMessage('Subscription failed. Please try again later.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/logo.jpg" 
                alt="Vrinda Boutique" 
                className="h-6 w-auto max-w-[150px] object-contain"
              />
              <h2 className="text-5xl md:text-2xl font-serif font-bold mb-1">
                <span className="text-white">VRINDA</span>
                <span className="text-amber-400">BOUTIQUE</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover timeless elegance and sophisticated style at our luxury boutique. 
              Curated collections for the discerning fashion enthusiast.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-gold transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-gold" />
                197, Sector 51, Gurugram, 122018
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-gold" />
                +91 7014854660
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-gold" />
                vrindaboutique04@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-semibold text-gold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300 text-sm">Get exclusive offers and be the first to know about new arrivals.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row w-full md:w-auto gap-2">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'loading'}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-amber-400 flex-1 md:w-40 text-white placeholder-gray-400 disabled:opacity-50"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="px-4 py-2 bg-gray-800 border border-gray-700 border-l-0 focus:outline-none focus:border-amber-400 flex-1 md:w-64 text-white placeholder-gray-400 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2 bg-amber-400 text-gray-900 rounded-r-lg hover:bg-amber-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
          
          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>{message}</span>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Vrinda Boutique. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
