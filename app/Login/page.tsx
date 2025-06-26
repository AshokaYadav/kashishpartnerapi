'use client'
import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';
import OTPModal from './components/OTPModal';
import { useSendLoginOtp } from '@/hooks/Login/useSendLoginOtp';
import { useRouter } from 'next/navigation';
import { useVerifyOtp } from '@/hooks/Login/useVerifyOtp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setCredentials } from '@/store/features/auth/authSlice';
import SignUpModal from './components/SignUpModal';
import useSendRegisterOtp from '@/hooks/Login/useSendRegisterOtp';
import { useVerifyRegisterOtp } from '@/hooks/Login/useVerifyRegisterOtp';
import SignUpModalNE from './components/SignUpModalNE';
import useSendPersonalDetail from '@/hooks/Login/useSendPersonalDetail';

// import { SignUpModal } from './components/SignUpModal';

// import { useVerifyOtp } from '@/hooks/useVerifyOtp';

export default function LoginPage() {
  const [mobile, setMobile] = useState<string>('');
  const [registerMobileNo,setRegisterMobileNo]=useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [alias, setAlias] = useState<string>('');
  const [showOtpFields, setShowOtpFields] = useState<boolean>(false);
    const [showRegisterOtpFields, setShowRegisterOtpFields] = useState<boolean>(false);
  const [showRegisterOtpField,setShowRegisterOtpField]=useState<boolean>(false);
  const [showNEFields, setShowNEFields] = useState<boolean>(false);
  const { mutate: sendOtp, isPending, data, error } = useSendLoginOtp();
   const {sendPersonDetail, isPending:PersonalDetailIsPending, data:PersonalDetailData, error:personalDetailError }=useSendPersonalDetail();
  const dispatch = useDispatch();
  const [token,setToken]=useState('');

  const { verify, isPending: isVerifyingOtpPending } = useVerifyOtp();
  const { registerVerify, isPending: isRegisterVerifyingOtpPending } = useVerifyRegisterOtp();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: sendRegisterOtp, isPending:registerOtp_pending, data:registerData, error:registerError } = useSendRegisterOtp();


const handleRegisterOtp = (mobileNumber:string) => {
  // const mobileNumber = '9876543210'; // dynamic ho sakta hai input se
  setRegisterMobileNo(mobileNumber)

  sendRegisterOtp(
    { mobileno: mobileNumber },
    {
      onSuccess: (registerData) => {
        console.log('OTP Sent Successfully:', registerData);
        // alert("OTP sent to your number!");
        // Maybe show OTP input fields now
        setShowRegisterOtpField(true);
      },
      onError: (registerError) => {
        console.error('Failed to send OTP:', registerError);
        alert('Failed to send OTP.');
      },
    }
  );
};


  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);



  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);

  const handleOtpSubmit = (otp: string) => {
    console.log('OTP submitted:', otp);

    verify(
      { otp, mobileno: mobile },
      {
        onSuccess: (data) => {
          if (data.status === true) {
            setShowOtpModal(false);
            alert('hello');
            console.log(data);
            // localStorage.setItem('token', data.token); // 
            // localStorage.setItem('user', JSON.stringify(data.data));
            dispatch(setCredentials({
              token: data.token,
              user: data.data,
            }));
            router.push('/');
          } else {
            alert('Invalid OTP');
          }
        },
        onError: (err) => {
          console.error(err);
          alert('Something went wrong');
        },
      }
    );
  };



  const handleRegisterOtpSubmit = (otp: string) => {
    registerVerify(
      { otp, mobileno: registerMobileNo },
      {
        onSuccess: (data) => {
          if (data.status === true) {
            setShowRegisterOtpField(false);
            alert('now you can show modal form over here');
            setToken(data.token);
            setShowNEFields(true);
            console.log(data);
          } else {
            alert('Invalid OTP');
          }
        },
        onError: (err) => {
          console.error(err);
          alert('Something went wrong');
        },
      }
    );
  };



  const handleResendOtp = () => {
    console.log('Resending OTP...');
    // Add your resend OTP logic here
  };



  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setMobile(value);
  };

  const handleGetOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sendOtp(
      { mobileno: mobile },
      {
        onSuccess: (data) => {
          if (data.status === true) {
            setShowOtpFields(true);
          }
        },
      }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ mobile, password, alias });
    // Add your form submission logic here
  };


  
   const handleSubmitNE = (formData: { fname: string; email: string }) => {
    console.log('Form submitted:', formData);
    // Handle form submission here (API call, etc.)
    const updatedFormData={
      mobileno:registerMobileNo,
      email:formData.email,
      token:token,
      name:formData.fname
    }

    sendPersonDetail({...updatedFormData},
      {
        onSuccess:(data)=>{
          console.log(data);
          if(data.status==true)
          setShowNEFields(false);
        }
      }
    )
    setShowNEFields(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row h-screen">
          {/* Left Side - Login Form */}
          <div className="w-full md:w-1/3 bg-white p-5 md:p-12 relative">
            {/* Logo */}
            <div className="absolute flex items-center  top-5 left-5 z-10">
              <img
                src="/login/image.png"
                className="h-10"
                alt="logo"
              />
              <span className='text-blue-500 font-bold text-2xl'>
                kashish India
              </span>
            </div>

            {/* Login Form */}
            <div className="h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Sign In
                </h1>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-800 mb-6 text-center">
                  Login To Your Account
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Mobile Input */}
                  <div className="mb-4">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={mobile}
                        onChange={handleMobileChange}
                        placeholder="Enter your Mobile"
                        pattern="[0-9]*"
                        maxLength={10}
                        minLength={10}
                        required
                      />
                      <i className="fa fa-phone absolute left-3 top-3 text-gray-400"></i>
                    </div>
                  </div>





                  {/* Submit Button */}
                  <button
                    type={showOtpFields ? "submit" : "button"}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 mt-6"
                    onClick={!showOtpFields ? handleGetOtp : undefined}
                  >
                    {showOtpFields ? "Sign In" : "Get OTP"}
                  </button>
                </form>

                <a
                  href="#modaldemo10"
                  className="block text-center text-purple-600 text-sm mt-4 hover:underline"
                >
                  Forgot Password ?
                </a>
              </div>

              {/* Sign Up Section */}
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Activate your Account
                </h2>
                {/* <a
                  href="#modaldemo8"
                  className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Register
                </a> */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
















          {/* Right Side - Video */}
          <div className="hidden md:block md:w-2/3 bg-black overflow-hidden">
            <div className="h-full w-full">
              {/* <video 
                autoPlay 
                muted 
                playsInline 
                loop
                className="h-full w-full object-cover"
              >
                <source
                  src="https://dashboard.aeronpay.in/assets/img/loginpage/AeronPay-Present-Login-2.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video> */}
              <img
                src="/login/image.png"
                className="h-full w-full "
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>



      <OTPModal
        isOpen={showOtpFields}
        onClose={() => setShowOtpFields(false)}
        onSubmit={handleOtpSubmit}
        onResend={handleResendOtp}
      />

      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegisterOtp}
      />

       <OTPModal
        isOpen={showRegisterOtpField}
        onClose={() => setShowRegisterOtpField(false)}
        onSubmit={handleRegisterOtpSubmit}
        onResend={handleResendOtp}
      />

       <SignUpModalNE
        isOpen={showNEFields}
        onClose={() => setShowNEFields(false)}
        onSubmit={handleSubmitNE}
      />

      {/* <OTPModal
        isOpen={showRegisterOtpFields}
        onClose={() => setShowRegisterOtpField(false)}
        onSubmit={handleRegisterOtpSubmit}
        onResend={handleResendOtp}
      /> */}
    </>
  );
}