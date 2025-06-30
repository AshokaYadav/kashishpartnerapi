'use client';
import React, { useEffect, useState } from 'react';
import useGetProfile from '@/hooks/Profile/useGetProfile';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import EditProfileModal from '@/components/Profile/EditProfileModal';

const Profile = () => {
  const { mutate, isPending, data, error } = useGetProfile();
  const user = useSelector((state: RootState) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      mutate(user.id);
    }
  }, [user?.id]);

  const refetchProfile = () => {
  if (user?.id) {
    mutate(user.id); // yeh tera useGetProfile ka get function hai
  }
};

  const profile = data?.data?.[0] || {};


  const renderValue = (value: any) =>
    value || <span className="text-gray-400 italic">Not Available</span>;

  return (
    <>
      <div className="max-w-6xl mx-auto  ">
        <div className="bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-3xl p-8 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full shadow">
                <FaUserCircle className="text-blue-600 text-5xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{renderValue(profile.name)}</h2>
                <p className="text-sm text-gray-500">User ID: {renderValue(profile.id)}</p>
              </div>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Status or error */}
          {isPending && <p className="text-blue-600 mb-4">Loading profile...</p>}
          {error && <p className="text-red-600 mb-4">Failed to load profile.</p>}

          {/* Profile Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Mobile No" value={profile.mobileno} />
            <ProfileItem label="Status" value={profile.status} />
            <ProfileItem label="Created At" value={profile.createdAt ? new Date(profile.createdAt).toLocaleString() : null} />
            <ProfileItem label="City" value={profile.city} />
            <ProfileItem label="Shop Name" value={profile.shopName} />
            <ProfileItem label="Aadhaar No" value={profile.aadharCardNumber} />
            <ProfileItem label="PAN No" value={profile.panCardNumber} />
            <ProfileItem label="Udyam Aadhaar No" value={profile.udhyamAadharNumber} />
            <ProfileItem label="GST No" value={profile.gstRegistrationNumber} />
            <ProfileItem label="Business Type" value={profile.businessType} />
          </div>
        </div>
      </div>

     {openModal && user?.id && (
  <EditProfileModal
    profile={profile}
    onClose={() => setOpenModal(false)}
    userId={user.id}
    onUpdateSuccess={refetchProfile} // 👈 yeh pass kiya
  />
)}
    </>
  );
};

const ProfileItem = ({ label, value }: { label: string; value: string | null }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">{label}</p>
    <p className="text-sm text-gray-800 font-medium">
      {value || <span className="text-gray-400 italic">Not Available</span>}
    </p>
  </div>
);

export default Profile;
