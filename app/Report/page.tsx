'use client';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface WalletHistory {
  id: string;
  user_id: string;
  type: string;
  before_balance: string;
  amount: string;
  after_balance: string;
  via: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const WalletHistoryPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [history, setHistory] = useState<WalletHistory[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`https://api.partner.kashishindiapvtltd.com/api/wallet-history/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.data || []);
        })
        .catch((err) => console.error('Error fetching wallet history:', err));
    }
  }, [user?.id]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Wallet History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Sr.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Before</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">After</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Via</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.length > 0 ? history.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₹{item.before_balance}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₹{item.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₹{item.after_balance}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.via}</td>
                  {/* <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'SUCCESS'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'FAILED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {item.status}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('en-GB')}<br />
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleTimeString('en-GB')}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="text-center text-sm py-6 text-gray-500">
                    No wallet history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletHistoryPage;
