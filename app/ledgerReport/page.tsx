// app/transactions/page.tsx
'use client';
import React, { useState } from 'react';
import { FiCalendar, FiFolder, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Transaction {
  id: string;
  transactionId: string;
  dateTime: string;
  account: string;
  service: string;
  referenceNo: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Pending';
}

const TransactionsPage = () => {
  // Mock data
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      transactionId: 'TXN123456',
      dateTime: '15/07/2023 10:30 AM',
      account: '9876543210',
      service: 'Mobile Prepaid',
      referenceNo: 'REF78901234',
      amount: 299,
      status: 'Success'
    },
    {
      id: '2',
      transactionId: 'TXN789012',
      dateTime: '14/07/2023 02:15 PM',
      account: '8765432109',
      service: 'Electricity',
      referenceNo: 'REF34567890',
      amount: 1500,
      status: 'Success'
    },
    {
      id: '3',
      transactionId: 'TXN345678',
      dateTime: '13/07/2023 11:45 AM',
      account: '7654321098',
      service: 'DTH',
      referenceNo: 'REF90123456',
      amount: 350,
      status: 'Failed'
    },
    {
      id: '4',
      transactionId: 'TXN901234',
      dateTime: '12/07/2023 09:20 AM',
      account: '6543210987',
      service: 'Water Bill',
      referenceNo: 'REF56789012',
      amount: 1200,
      status: 'Pending'
    },
    {
      id: '5',
      transactionId: 'TXN567890',
      dateTime: '11/07/2023 04:30 PM',
      account: '9876543210',
      service: 'Fastag',
      referenceNo: 'REF12345678',
      amount: 500,
      status: 'Success'
    }
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transactionType, setTransactionType] = useState('');

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = Object.values(transaction).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const transactionDate = new Date(transaction.dateTime.split(' ')[0].split('/').reverse().join('-'));
    const from = fromDate ? new Date(fromDate.split('/').reverse().join('-')) : null;
    const to = toDate ? new Date(toDate.split('/').reverse().join('-')) : null;
    
    const matchesDate = 
      (!from || transactionDate >= from) && 
      (!to || transactionDate <= to);
    
    const matchesType = !transactionType || transactionType === 'All' || 
                       transaction.service.toLowerCase().includes(transactionType.toLowerCase());
    
    return matchesSearch && matchesDate && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / entriesPerPage);
  const indexOfLastTransaction = currentPage * entriesPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - entriesPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Filter Section */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-12 gap-4">
            {/* From Date */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="dd/mm/yyyy"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>

            {/* To Date */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="dd/mm/yyyy"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            {/* Transaction Type */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="">Select Report type</option>
                <option value="All">All</option>
                <option value="Mobile Prepaid">Mobile Prepaid</option>
                <option value="DTH">DTH</option>
                <option value="Electricity">Electricity</option>
                <option value="Water Bill">Water Bill</option>
                <option value="Fastag">Fastag</option>
              </select>
            </div>

            {/* Find Button */}
            <div className="col-span-12 sm:col-span-6 md:col-span-2 flex items-end">
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setCurrentPage(1)}
              >
                <FiFolder className="mr-2" />
                Find
              </button>
            </div>

            {/* Export Button */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 flex items-end justify-end">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-4">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            {/* Entries per page */}
            <div className="flex items-center mb-2 sm:mb-0">
              <label className="text-sm text-gray-700 mr-2">Show</label>
              <select
                className="block w-20 py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label className="text-sm text-gray-700 ml-2">entries</label>
            </div>

            {/* Search */}
            <div className="w-full sm:w-auto">
              <label className="sr-only">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full sm:w-64 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UTR / Reference No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Txn Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.dateTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.account}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.referenceNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Success' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              Showing <span className="font-medium">{indexOfFirstTransaction + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastTransaction, filteredTransactions.length)}</span> of{' '}
              <span className="font-medium">{filteredTransactions.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;