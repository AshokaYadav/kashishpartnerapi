'use client';
import FormModal from '@/components/FundRequest/FormModal';
import useGetFund from '@/hooks/FundRequest/useGetFund';
import usePostFund from '@/hooks/FundRequest/usePostFund';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);

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
                    fundget(user.id); // re-fetch after submit
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

    const fund = fundata?.data?.data[0]; // 🟢 Only 1 object

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
            {/* 🟦 Button */}


            {/* 📝 Modal */}
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

            {/* 🧾 Fund Details */}
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
                {/* 🟦 Heading */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-800">
                        Your Fund Request Details
                    </h2>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition duration-200"
                    >
                        Request Fund
                    </button>
                </div>

                {/* 🔁 Loading/Error Messages */}
                {fundPending && <p className="text-gray-500 text-sm">Loading fund data...</p>}
                {fundError && <p className="text-red-500 text-sm">Error fetching fund data.</p>}

                {/* 📄 Fund Info */}
                {fund ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-800">
                        <InfoCard label="Deposited Amount">₹{fund.deposite_amount}</InfoCard>
                        <InfoCard label="Payment Method">{fund.payment_method}</InfoCard>
                        <InfoCard label="Bank Name">{fund.bank_name}</InfoCard>
                        <InfoCard label="Bank UTR">{fund.bank_utr}</InfoCard>
                        <InfoCard label="Date">{fund.date}</InfoCard>
                        <InfoCard label="Remark">{fund.remark}</InfoCard>
                        <InfoCard label="Status">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${fund.status === 'ACTIVE'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {fund.status}
                            </span>
                        </InfoCard>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm italic">No fund request found.</p>
                )}
            </div>

        </div>
    );
};

// 🔁 Stylish InfoCard
const InfoCard = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-150">
        <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">
            {label}
        </div>
        <div className="text-base font-medium text-gray-900">{children}</div>
    </div>
);

export default Page;