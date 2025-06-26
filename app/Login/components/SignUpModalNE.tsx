'use client'
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { fname: string; email: string }) => void;
}

const SignUpModalNE = ({ isOpen, onClose, onSubmit }: SignUpModalProps) => {
    const [formData, setFormData] = useState({
        fname: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50bg-opacity-50">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-xl w-full max-w-md border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Modal Header */}
                <div className="rounded-t-2xl bg-gray-500 text-white p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-extrabold text-center flex-1">
                            Sign Up
                        </h2>
                        <button onClick={onClose} className="text-white hover:text-gray-200">
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Full Name Field */}
                    <h2 className='flex text-2xl'>Personal Detail</h2>
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="Enter your full name"
                            className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.fname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModalNE;