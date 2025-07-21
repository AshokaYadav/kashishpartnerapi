'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useGetLedgerReports from '@/hooks/LedgerReport/useGetLedgerReport';
import {
  FiCalendar,
  FiFolder,
  FiDownload,
} from 'react-icons/fi';

interface Transaction {
  id: string;
  transaction_id: string;
  account?: string;
  service: string;
  referenceNo?: string;
  txn_amount: number;
  operatorCircle?: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

interface LedgerReportResponse {
  data?: {
    count: number;
    rows: Transaction[];
  };
  message?: string;
  success?: boolean;
}

const TransactionsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate, data = {} as LedgerReportResponse, error, isPending } = useGetLedgerReports();

  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    console.log(user?.id)
    if (user?.id) mutate(user?.id);
  }, [user, mutate]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* From Date */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>

            {/* To Date */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-sm"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            {/* Find Button */}
            <div className="col-span-6 sm:col-span-3 md:col-span-2">
              <button
                onClick={() => { }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 flex items-center justify-center"
              >
                <FiFolder className="mr-2" /> Find
              </button>
            </div>

            {/* Export Button */}
            <div className="col-span-12 sm:col-span-3 md:col-span-3 md:col-start-10 flex justify-end">
              <button className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
                <FiDownload className="mr-2" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          {/* Search */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-3 border border-gray-300 rounded-md text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operation Circle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.data?.rows.length > 0 ? data?.data?.data?.rows.map((txn: any) => (
                  <tr key={txn.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.transaction_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(txn.createdAt).toLocaleDateString('en-GB') + ' ' + new Date(txn.createdAt).toLocaleTimeString('en-GB')}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">{txn.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{txn.txn_amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{txn.operatorCircle || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${txn.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          txn.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="text-center text-sm py-6 text-gray-500">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;