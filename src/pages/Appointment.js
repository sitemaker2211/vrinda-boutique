import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Send, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_rgmefvg',
        'template_scv6ze6',
        {
          name: formData.name,
          email: formData.email,
          subject: `Appointment Request - ${formData.appointmentType}`,
          message: `
Appointment Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Appointment Type: ${formData.appointmentType}
- Preferred Date: ${formData.preferredDate}
- Preferred Time: ${formData.preferredTime}
- Additional Message: ${formData.message}
          `.trim()
        },
        'RepnMH8wE8bzSlRsO'
      );

      alert('Appointment Request Sent Successfully! We will contact you shortly to confirm.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        appointmentType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });

    } catch (error) {
      console.error(error);
      alert(error?.text || 'Failed to send appointment request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center hero-gradient">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            Book an <span className="text-gold">Appointment</span>
          </h1>
          <p className="text-lg text-gray-200">
            Schedule a personalized consultation with us
          </p>
        </motion.div>
      </section>

      {/* Appointment Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Schedule Your <span className="text-gold">Visit</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Book an appointment for a personalized styling consultation, 
                  custom fitting, or to view our exclusive collection. 
                  Our team is dedicated to providing you with an exceptional experience.
                </p>
              </div>

              {/* Appointment Types */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Types</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                        <User className="h-6 w-6 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Personal Styling</h4>
                      <p className="text-gray-600 text-sm">One-on-one consultation with our stylists</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Collection Viewing</h4>
                      <p className="text-gray-600 text-sm">Exclusive preview of new arrivals</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Custom Fitting</h4>
                      <p className="text-gray-600 text-sm">Tailored fittings for your perfect fit</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">197, Sector 51</p>
                  <p className="text-gray-600">Gurugram, Haryana, 122018</p>
                  <p className="text-sm text-gray-500 mt-1">By appointment only</p>
                </div>
              </div>

              {/* Store Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 10am - 7pm</p>
                  <p className="text-gray-600">Saturday: 11am - 6pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Appointment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Book Your <span className="text-gold">Appointment</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    id="appointmentType"
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    <option value="">Select appointment type</option>
                    <option value="Personal Styling">Personal Styling</option>
                    <option value="Collection Viewing">Collection Viewing</option>
                    <option value="Custom Fitting">Custom Fitting</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                      >
                        <option value="">Select time</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                    placeholder="Any specific requirements or preferences..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Book Appointment
                </button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-4">
                We'll confirm your appointment via email within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
