'use client'
import useGetDeveloper from '@/hooks/Developer/useGetDeveloper'
import { RootState } from '@/store/store';
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import OTPModal from '../Login/components/OTPModal';
import usePutDeveloper from '@/hooks/Developer/usePutDeveloper';
import usePostDeveloper from '@/hooks/Developer/usePostOtp';
import usePostVerifyDeveloper from '@/hooks/Developer/usePostVerifyOtp';
import { useRouter } from 'next/navigation';

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
  const { mutate: IpApi } = usePutDeveloper();
  const { mutate: IpOtpApi } = usePostDeveloper();
  const { mutate: IpOtpVerifyApi, data: IpOtpVerifyData } = usePostVerifyDeveloper();
  const router = useRouter();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isEditingCallback, setIsEditingCallback] = useState(false);
  const [isEditingIp, setIsEditingIp] = useState(false);
  const [callbackValue, setCallbackValue] = useState('');
  const [ip, setip] = useState('');
  const [clientSecretData, setClientSecretData] = useState<{
    client_id: string;
    client_secret: string;
  } | null>(null);

  const inputRef = useRef<HTMLDivElement>(null);
  const inputRef1 = useRef<HTMLDivElement>(null);

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


  useEffect(() => {
    if (data?.data?.data?.[0]?.ip) {
      setip(data.data.data[0].ip);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditingIp &&
        inputRef1.current &&
        !inputRef1.current.contains(event.target as Node)
      ) {
        setIsEditingIp(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditingIp]);




  // ✅ When OTP verified successfully → store secret info
  useEffect(() => {
    if (
      IpOtpVerifyData?.data?.UserCredential?.client_id &&
      IpOtpVerifyData?.data?.UserCredential?.client_secret
    ) {
      setClientSecretData({
        client_id: IpOtpVerifyData.data.UserCredential.client_id,
        client_secret: IpOtpVerifyData.data.UserCredential.client_secret
      });
    }
  }, [IpOtpVerifyData]);

  const handleOtpSubmit = (otp: string) => {
    if (user) {
      IpOtpVerifyApi({
        otp: otp,
        mobileno: user.mobileno
      });
    }
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
      {credentials && (
        <div>
          <div className="flex justify-between items-center bg-white px-4 py-3 rounded shadow mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Developer Credentials</h2>

            <button onClick={() => router.push('/document')} className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition duration-200">
              Documentation
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CredentialItem label="ID" value={credentials.id} />
            <CredentialItem label="User ID" value={credentials.user_id} />
            <CredentialItem label="Client ID" value={credentials.client_id} />

            {/* ✅ Client Secret section with conditional display */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Client Secret</p>

              {clientSecretData ? (
                <>
                  <p className="text-sm text-gray-800 font-medium">
                    {/* <span className="block">Client ID: {clientSecretData.client_id}</span> */}
                    <span className="block overflow-x-auto whitespace-nowrap">
                      {clientSecretData.client_secret}
                    </span>
                  </p>

                </>
              ) : (
                <button
                  onClick={() => {
                    setShowOtpModal(true);
                    if (user) {
                      IpOtpApi({
                        mobileno: user.mobileno
                      });
                    }
                  }}
                  className="text-sm text-indigo-600 font-medium hover:underline"
                >
                  View Secret (OTP Required)
                </button>
              )}
            </div>

            {/* ✅ Editable Callback Field */}
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
                      if (user) {
                        IpApi({
                          id: user.id,
                          payload: {
                            callback: callbackValue
                          }
                        });
                        setIsEditingCallback(false);
                      }
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



            <div
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all"
              ref={inputRef1}
            >
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Ip</p>
              {isEditingIp ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ip}
                    onChange={(e) => setip(e.target.value)}
                    className="text-sm text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      if (user) {
                        IpApi({
                          id: user.id,
                          payload: {
                            ip: ip
                          }
                        });
                        setIsEditingIp(false);
                      }
                    }}
                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  onClick={() => setIsEditingIp(true)}
                  className="text-sm text-indigo-600 font-medium hover:underline cursor-pointer"
                >
                  {ip || <span className="text-gray-400 italic">Not Available</span>}
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
