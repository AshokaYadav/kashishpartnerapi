// components/FormModal.tsx
'use client';
import React from 'react';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<any>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
    isPending: boolean;
    formData: {
        deposite_amount: string;
        payment_method: string;
        bank_name: string;
        bank_utr: string;
        remark: string;
        date: string;
    };
    data: any;
    error: any;
}

const FormModal: React.FC<FormModalProps> = ({
    isOpen,
    onClose,
    onChange,
    onSubmit,
    onReset,
    isPending,
    formData,
    data,
    error,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-4xl relative border border-gray-200">
                {/* ❌ Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-600 text-2xl font-bold hover:text-red-500"
                >
                    &times;
                </button>

                {/* 🧾 Form Heading */}
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    📝 Fund Request Form
                </h2>

                {/* 🧩 Form Fields */}
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField label="Deposited Amount">
                        <input
                            type="number"
                            name="deposite_amount"
                            value={formData.deposite_amount}
                            onChange={onChange}
                            className="w-full bg-white/60 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </FormField>

                    <FormField label="Payment Method">
                        <select
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={onChange}
                            className="w-full bg-white/60 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Payment Method</option>
                            <option>NEFT</option>
                            <option>IMPS</option>
                            <option>UPI</option>
                        </select>
                    </FormField>

                    <FormField label="Date of Payment">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={onChange}
                            className="w-full bg-white/60 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </FormField>

                    <FormField label="Bank Name">
                        <select
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={onChange}
                            className="w-full bg-white/60 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Bank</option>
                            <option>SBI</option>
                            <option>HDFC</option>
                            <option>ICICI</option>
                        </select>
                    </FormField>

                    <FormField label="Bank Reference / UTR">
                        <input
                            type="text"
                            name="bank_utr"
                            value={formData.bank_utr}
                            onChange={onChange}
                            className="w-full bg-white/60 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </FormField>

                    <div className="md:col-span-2">
                        <FormField label="Remarks">
                            <textarea
                                name="remark"
                                rows={2}
                                value={formData.remark}
                                onChange={onChange}
                                className="w-full bg-white/60 border rounded-lg px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </FormField>
                    </div>

                    {/* ✅ Buttons */}
                    <div className="flex items-center space-x-4 mt-2">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
                        >
                            {isPending ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            onClick={onReset}
                            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition"
                        >
                            Reset
                        </button>
                    </div>

                    {/* ✅ Success/Error Message */}
                    {data && <p className="text-green-600 col-span-3">✅ Fund request submitted!</p>}
                    {error && <p className="text-red-600 col-span-3">❌ Error submitting fund request.</p>}
                </form>
            </div>
        </div>

    );
};

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

export default FormModal;
