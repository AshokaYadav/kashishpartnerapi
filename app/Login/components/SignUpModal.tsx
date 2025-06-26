'use client'
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mobileNumber: string) => void;
}

const SignUpModal = ({ isOpen, onClose, onSubmit }: SignUpModalProps) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const input = document.getElementById('mobile-input') as HTMLInputElement | null;
      input?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(mobileNumber);
    // Reset after submission (you might want to handle this differently based on your flow)
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50bg-opacity-50">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-xl w-full max-w-md border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-500 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-center flex-1">
              Sign Up
            </h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-center text-gray-900 mb-6">
            Enter your mobile number to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="mobile-input" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                id="mobile-input"
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-center text-lg font-semibold text-gray-700 
                      focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                required
                maxLength={10}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors
                      font-medium text-sm uppercase tracking-wide shadow-sm"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl 
                      hover:from-purple-700 hover:to-indigo-700 transition-all font-medium text-sm uppercase
                      tracking-wide shadow-lg shadow-purple-100 hover:shadow-purple-200 disabled:opacity-70"
                disabled={isSubmitting || mobileNumber.length !== 10}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            By signing up, you agree to our Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;