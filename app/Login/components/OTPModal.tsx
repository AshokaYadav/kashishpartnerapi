import { useState, useEffect } from 'react';

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (otp: string) => void;
    onResend: () => void;
}

const OTPModal = ({
    isOpen,
    onClose,
    onSubmit,
    onResend
}: OTPModalProps) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

    // console.log(onSubmit)

    // Auto-focus first input when modal opens
    useEffect(() => {
        if (isOpen) {
            const firstInput = document.getElementById('otp-0') as HTMLInputElement | null;
            firstInput?.focus();
        }
    }, [isOpen]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
            prevInput?.focus();
        }
    };

    const handleSubmit = () => {
        const fullOtp = otp.join('');
        if (fullOtp.length === 6) {
            // alert('kkkkk   kkkk')
            // console.log(onSubmit);
            onSubmit(fullOtp);
        } else {
            alert('Please enter complete OTP');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50  ">
            <div className="z-100  rounded-2xl bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-xl w-full max-w-md border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className=" rounded-t-2xl text-3xl font-extrabold text-center mb-6 bg-gray-500 text-white p-4 ">
                    <span className="inline-block">
                        OTP Verification
                    </span>
                </h2>
                <p className="text-center text-gray-900 mb-8">We've sent a 6-digit code to your mobile</p>

                <div className="flex justify-center space-x-3 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            className="w-14 h-14 border-2 border-black rounded-xl text-center text-2xl font-semibold text-gray-700 
                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                <div className="flex gap-4 mb-6 mx-2">
                    <button
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors
                  font-medium text-sm uppercase tracking-wide shadow-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl 
                  hover:from-purple-700 hover:to-indigo-700 transition-all font-medium text-sm uppercase
                  tracking-wide shadow-lg shadow-purple-100 hover:shadow-purple-200"
                        onClick={handleSubmit}
                    >
                        Verify
                    </button>
                </div>

                <p className="text-center text-sm text-gray-400 mb-4">
                    Didn't receive code?{' '}
                    <button
                        className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                        onClick={() => {
                            setOtp(['', '', '', '', '', '']);
                            onResend();
                        }}
                    >
                        Resend OTP
                    </button>
                </p>
            </div>
        </div>
    );
};

export default OTPModal;