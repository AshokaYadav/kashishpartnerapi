import usePutProfile from '@/hooks/Profile/usePutProfile';
import React, { useState } from 'react';

const EditProfileModal = ({ profile, onClose,userId , onUpdateSuccess}: { profile: any, onClose: () => void,userId:string , onUpdateSuccess: () => void;}) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    mobileno: profile.mobileno || '',
    city: profile.city || '',
    shopName: profile.shopName || '',
    aadharCardNumber: profile.aadharCardNumber || '',
    panCardNumber: profile.panCardNumber || '',
    udhyamAadharNumber: profile.udhyamAadharNumber || '',
    gstRegistrationNumber: profile.gstRegistrationNumber || '',
    businessType: profile.businessType || '',
  });

   const { mutate, isPending, error } = usePutProfile(userId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  



    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        alert('Profile updated!');
        onUpdateSuccess(); // 👈 trigger get call again
        onClose();
      },
      onError: () => {
        alert('Update failed.');
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[80%] max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Individual Input */}
          {[
            { label: 'Name', name: 'name' },
            { label: 'Email', name: 'email' },
            { label: 'Mobile Number', name: 'mobileno' },
            { label: 'City', name: 'city' },
            { label: 'Shop Name', name: 'shopName' },
            { label: 'Aadhaar Number', name: 'aadharCardNumber' },
            { label: 'PAN Number', name: 'panCardNumber' },
            { label: 'Udyam Aadhaar No.', name: 'udhyamAadharNumber' },
            { label: 'GST Registration No.', name: 'gstRegistrationNumber' },
            { label: 'Business Type', name: 'businessType' },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="text-sm text-gray-700 font-medium mb-1">{label}</label>
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          {/* Button Row */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
