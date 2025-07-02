'use client';
import FormModal from '@/components/FundRequest/FormModal';
import useGetFund from '@/hooks/FundRequest/useGetFund';
import usePostFund from '@/hooks/FundRequest/usePostFund';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFilters } from './Hooks/useFilters';

const Page = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);
    const [fromDate,setFromDate]=useState('');
    const [toDate,setToDate]=useState('');
    
    
    const [formData, setFormData] = useState({
        user_id: user?.id || '',
        deposite_amount: '',
        payment_method: '',
        bank_name: '',
        bank_utr: '',
        remark: '',
        date: '',
    });
    
    const { mutate, isPending, data, error } = usePostFund();


    const {
        mutate: fundget,
        isPending: fundPending,
        data: fundata,
        error: fundError,
    } = useGetFund();
    
    const funds = fundata?.data?.data || [];
    console.log(fundata?.data?.data);
    console.log(funds);

    const{filteredData:filtered,applyFilters}=useFilters(funds);

    console.log(filtered);

    
    
    
    
    
    useEffect(() => {
        if (user?.id) {
            fundget(user.id);
        }
    }, [user?.id]);
    
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: () => {
                setIsOpen(false);
                handleReset();
                if (user?.id) {
                    fundget(user.id);
                }
            },
        });
    };
    
    const handleReset = () => {
        setFormData({
            user_id: user?.id || '',
            deposite_amount: '',
            payment_method: '',
            bank_name: '',
            bank_utr: '',
            remark: '',
            date: '',
        });
    };
    
    

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Search name"
            className="border rounded p-2 w-full"
          />
        </div> */}

        <button
          onClick={()=>applyFilters({fromDate,toDate})}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </div>
            
            {/* Modal */}
            <FormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
                isPending={isPending}
                formData={formData}
                data={data}
                error={error}
            />

            {/* Fund Request Section */}
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">


                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-800">
                        Fund Request History
                    </h2>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition duration-200"
                    >
                        + New Request
                    </button>
                </div>

                {/* Loading/Error States */}
                {fundPending && (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                {fundError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    Error loading fund requests. Please try again.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                {filtered.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bank Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Remark
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((fund: any) => (
                                    <tr key={fund.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ₹{fund.deposite_amount}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{fund.payment_method}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div>{fund.bank_name}</div>
                                                <div className="text-xs text-gray-500">{fund.bank_utr}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{fund.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {fund.remark}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                fund.status === 'ACTIVE' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {fund.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No fund requests</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new fund request.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Request
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;