'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useGetFund from '@/hooks/FundRequest/useGetFund';
import usePostFund from '@/hooks/FundRequest/usePostFund';
import FormModal from '@/components/FundRequest/FormModal';
import FundTable from '@/components/FundRequest/FundTable';
import useGetBank from '@/hooks/FundRequest/useGetBank';

interface FormData {
  user_id: string;
  deposite_amount: string;
  payment_method: string;
  bank_name: string;
    account_number: string;
  bank_utr: string;
  remark: string;
  date: string;
}
interface Bank {
  id: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  branch: string;
  ifsc_code: string;
  upi_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


const Page = () => { 
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    user_id: user?.id || '',
    deposite_amount: '',
    payment_method: '',
    bank_name: '',
    account_number:'',
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

  const {
    mutate: bankget,
    isPending: benkPending,
    data: bankdata,  
    error: bankError,
  } = useGetBank();   

   const [selectedBank, setSelectedBank] = useState<string>("");



    const funds = fundata?.data?.data || [];




  useEffect(() => {
    if (user?.id) {
      fundget(user.id);
      bankget();
    }
  }, [user?.id, fundget]);

  

//  const uniqueBankNames: string[] = [
//   ...new Set(bankdata?.data?.data.map((item: Bank) => item.bank_name))
// ];

const uniqueBankNames: string[] = Array.from(
  new Set(
    (bankdata?.data?.data ?? []).map((item:Bank) => item.bank_name)
  )
);

const accountsForSelectedBank =  (bankdata?.data?.data ?? []).filter(
  (item:Bank) => item.bank_name === selectedBank
);

const accountNumbers = accountsForSelectedBank.map((item:Bank) => item.account_number);


console.log(uniqueBankNames);

  

  useEffect(() => {
    if (user?.id) {
      fundget(user.id);
    }
  }, [user?.id, fundget]);

  useEffect(()=>{
    console.log(selectedBank);
    console.log(accountNumbers);
    console.log(formData)
  },[selectedBank,formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
        handleReset();
        if (user?.id) fundget(user.id);
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
      account_number:'',
      date: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      <h2 className="font-bold  text-blue-800">Fund Request History</h2>

      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition duration-200"
        >
          + New Request
        </button>
      </div>

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
        uniqueBankNames={uniqueBankNames}
        setSelectedBank={setSelectedBank}
        accountNumbers={accountNumbers}
        
      />

      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
        {fundPending ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : fundError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">Error loading fund requests. Please try again.</p>
          </div>
        ) : funds.length > 0 ? (
          <FundTable data={funds} />
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No fund requests</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new fund request.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                + New Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;