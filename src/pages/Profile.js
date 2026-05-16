import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ArrowLeft, ShoppingBag, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateUserData } from '../firebase';

const Profile = () => {
  const { user, isAuthenticated, loading, refreshUserData, checkEmailVerification, sendVerificationEmailToUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: '',
    phone: ''
  });
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isSavingPhone, setIsSavingPhone] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState('');
  const [isSendingEmailVerification, setIsSendingEmailVerification] = useState(false);
  const [emailVerificationMessage, setEmailVerificationMessage] = useState('');
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handlePhoneInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setPhoneMessage('');
  };

  const handleSavePhone = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      setPhoneMessage('Please enter a valid phone number');
      return;
    }

    setIsSavingPhone(true);
    setPhoneMessage('');

    try {
      const { error } = await updateUserData(user.uid, {
        phone: formData.phone
      });
      
      if (error) {
        setPhoneMessage('Failed to update phone number. Please try again.');
      } else {
        setPhoneMessage('Phone number updated successfully!');
        setIsEditingPhone(false);
        refreshUserData().catch(err => console.error('Failed to refresh user data:', err));
      }
    } catch (error) {
      setPhoneMessage('Failed to update phone number. Please try again.');
    } finally {
      setIsSavingPhone(false);
    }
  };

  const handleCancelPhoneEdit = () => {
    setIsEditingPhone(false);
    setPhoneMessage('');
    if (user) {
      setFormData(prev => ({
        ...prev,
        phone: user.phone || ''
      }));
    }
  };

  const handleSendEmailVerification = async () => {
    setIsSendingEmailVerification(true);
    setEmailVerificationMessage('');

    try {
      const { error } = await sendVerificationEmailToUser();

      if (error) {
        setEmailVerificationMessage('Failed to send verification email. Please try again.');
      } else {
        setEmailVerificationMessage('Verification email sent! Please check your inbox.');
      }
    } catch (error) {
      setEmailVerificationMessage('Failed to send verification email. Please try again.');
    } finally {
      setIsSendingEmailVerification(false);
    }
  };

  const handleCheckVerification = async () => {
    setIsCheckingVerification(true);
    setEmailVerificationMessage('');

    try {
      const isVerified = await checkEmailVerification();

      if (isVerified) {
        setEmailVerificationMessage('Email verified successfully!');
      } else {
        setEmailVerificationMessage('Email not verified yet. Please check your inbox and click the verification link.');
      }
    } catch (error) {
      setEmailVerificationMessage('Failed to check verification status. Please try again.');
    } finally {
      setIsCheckingVerification(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </button>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200"
        >
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.displayName || 'User'}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  disabled
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-600 cursor-not-allowed"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className={`appearance-none block w-full pl-10 pr-32 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-600 cursor-not-allowed ${
                    user.emailVerified ? '' : ''
                  }`}
                />
                {!user.emailVerified && (
                  <button
                    onClick={handleSendEmailVerification}
                    disabled={isSendingEmailVerification}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-amber-400 text-gray-900 rounded-md hover:bg-amber-500 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSendingEmailVerification ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Verify
                      </div>
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>

              {/* Email Verification Status */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {user.emailVerified ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium">Email Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-amber-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Email Not Verified</span>
                    </div>
                  )}
                </div>
                {!user.emailVerified && (
                  <button
                    onClick={handleCheckVerification}
                    disabled={isCheckingVerification}
                    className="text-xs text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isCheckingVerification ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-amber-600 mr-1"></div>
                        Checking...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Check Status
                      </div>
                    )}
                  </button>
                )}
              </div>

              {emailVerificationMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-2 px-4 py-2 rounded-lg text-sm ${
                    emailVerificationMessage.includes('verified') || emailVerificationMessage.includes('sent')
                      ? 'bg-green-50 border border-green-200 text-green-600'
                      : 'bg-amber-50 border border-amber-200 text-amber-600'
                  }`}
                >
                  {emailVerificationMessage}
                </motion.div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneInputChange}
                  disabled={!isEditingPhone}
                  className={`appearance-none block w-full pl-10 pr-24 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all ${
                    isEditingPhone ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder="Your phone number"
                />
                {!isEditingPhone ? (
                  <button
                    onClick={() => setIsEditingPhone(true)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-amber-400 text-gray-900 rounded-md hover:bg-amber-500 transition-colors text-xs font-medium"
                  >
                    {formData.phone ? 'Change' : 'Add'}
                  </button>
                ) : (
                  <button
                    onClick={handleSavePhone}
                    disabled={isSavingPhone || !formData.phone}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-amber-400 text-gray-900 rounded-md hover:bg-amber-500 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSavingPhone ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Save
                      </div>
                    )}
                  </button>
                )}
              </div>
              {phoneMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-2 px-4 py-2 rounded-lg text-sm ${
                    phoneMessage.includes('success')
                      ? 'bg-green-50 border border-green-200 text-green-600'
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}
                >
                  {phoneMessage}
                </motion.div>
              )}
              {isEditingPhone && (
                <button
                  onClick={handleCancelPhoneEdit}
                  className="mt-2 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>


          </div>
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-amber-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-gray-900">
  {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium text-gray-900 text-sm">{user.uid}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
