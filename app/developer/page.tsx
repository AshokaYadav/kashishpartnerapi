'use client'
import useGetDeveloper from '@/hooks/Developer/useGetDeveloper'
import { RootState } from '@/store/store';
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import OTPModal from '../Login/components/OTPModal';

const CredentialItem = ({ label, value }: { label: string; value: string | null }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">{label}</p>
    <p className="text-sm text-gray-800 font-medium">
      {value || <span className="text-gray-400 italic">Not Available</span>}
    </p>
  </div>
);

const Page = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate, data, error, isPending } = useGetDeveloper();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isEditingCallback, setIsEditingCallback] = useState(false);
  const [callbackValue, setCallbackValue] = useState('');
  const inputRef = useRef<HTMLDivElement>(null); // 🔁 ref for outside click detection

  useEffect(() => {
    if (user) mutate(user?.id);
  }, []);

  useEffect(() => {
    if (data?.data?.data?.[0]?.callback) {
      setCallbackValue(data.data.data[0].callback);
    }
  }, [data]);

  // ✅ Detect outside click and close input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditingCallback &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditingCallback(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditingCallback]);

  const handleOtpSubmit = (otp: string) => {
    console.log("Submitted OTP:", otp);
    setShowOtpModal(false);
  };

  const handleOtpResend = () => {
    console.log("Resend OTP clicked");
  };

  if (isPending) {
    return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
  }

  const credentials = data?.data?.data?.[0];

  return (
    <div className="p-6">
      {/* <div className="flex justify-end mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow">
          {credentials ? "Update API"  : "Create Api"}
        </button>
      </div> */}

      {credentials && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Developer Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <CredentialItem label="ID" value={credentials.id} />
            <CredentialItem label="User ID" value={credentials.user_id} />
            <CredentialItem label="Client ID" value={credentials.client_id} />

            {/* Client Secret */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Client Secret</p>
              <button
                onClick={() => setShowOtpModal(true)}
                className="text-sm text-indigo-600 font-medium hover:underline"
              >
                View Secret (OTP Required)
              </button>
            </div>

            {/* ✅ Editable Callback field with click outside detection */}
            <div
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all"
              ref={inputRef}
            >
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Callback</p>

              {isEditingCallback ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={callbackValue}
                    onChange={(e) => setCallbackValue(e.target.value)}
                    className="text-sm text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      console.log("Updated Callback:", callbackValue);
                      setIsEditingCallback(false);
                      // 🔁 Add API call here if needed
                    }}
                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  onClick={() => setIsEditingCallback(true)}
                  className="text-sm text-indigo-600 font-medium hover:underline cursor-pointer"
                >
                  {callbackValue || <span className="text-gray-400 italic">Not Available</span>}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ OTP Modal */}
      <OTPModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSubmit={handleOtpSubmit}
        onResend={handleOtpResend}
      />
    </div>
  );
};

export default Page;
