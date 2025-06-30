'use client';
import React from 'react';

const Page = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8 border border-blue-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-500">Fund Request</h2>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Deposited Amount */}
          <FormField label="Deposited Amount">
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full bg-transparent outline-none"
            />
          </FormField>

          {/* Payment Method */}
          <FormField label="Payment Method">
            <select className="w-full bg-transparent outline-none">
              <option>Select Payment Method</option>
              <option>NEFT</option>
              <option>IMPS</option>
              <option>UPI</option>
            </select>
          </FormField>

          {/* Date of Payment */}
          <FormField label="Date of Payment">
            <input type="date" className="w-full bg-transparent outline-none" />
          </FormField>

          {/* Bank Name */}
          <FormField label="Bank Name">
            <select className="w-full bg-transparent outline-none">
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
            </select>
          </FormField>

          {/* Account Details */}
          <FormField label="Account Details">
            <select className="w-full bg-transparent outline-none">
              <option>Select Account</option>
              <option>Account 1</option>
              <option>Account 2</option>
            </select>
          </FormField>

          {/* Bank Reference / UTR */}
          <FormField label="Bank Reference / UTR">
            <input
              type="text"
              placeholder="Reference / UTR"
              className="w-full bg-transparent outline-none"
            />
          </FormField>

          {/* Remarks */}
          <div className="md:col-span-2">
            <FormField label="Remarks">
              <textarea
                rows={2}
                placeholder="Enter any remarks"
                className="w-full bg-transparent outline-none resize-none"
              />
            </FormField>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4 mt-2">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition">
              Submit
            </button>
            <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable form field without icon
const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all">
    <label className="text-sm text-gray-500 font-semibold mb-1 block">{label}</label>
    <div>{children}</div>
  </div>
);

export default Page;
