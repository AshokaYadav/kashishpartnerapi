'use client';
import React, { useState, useRef, useEffect } from 'react';

const Page = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto focus first input
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9a-zA-Z]{0,1}$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-xl relative border border-gray-200">
        <div className="flex gap-2 justify-center">
          {otp.map((item, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el; // ✅ No return
              }}
              value={item}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
              className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
