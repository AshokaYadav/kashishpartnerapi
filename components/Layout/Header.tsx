'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <header className="bg-white shadow-sm  z-30 sticky top-0">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="mr-4 text-gray-600 hover:text-gray-800"
                    >
                        <FiMenu size={24} />
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <div className='flex justify-end items-center gap-8'>
                            <p className="text-gray-700 font-medium text-sm">
                                Wallet Amount: <span className="text-blue-600 font-semibold">$14,000</span>
                            </p>
                            <button className="flex items-center space-x-2">
                                <Image
                                    src="/image.png"
                                    alt="User"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </button>
                        </div>

                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                            <div className="p-4 bg-blue-600 text-white rounded-t-md">
                                <div className="flex items-center space-x-3">
                                    <Image
                                        src="/image.png"
                                        alt="User"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h6 className="font-semibold">{user?.name}</h6>
                                        <span className="text-xs">Customer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="py-1">
                                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                    {user?.email}
                                </Link>
                                <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                    Membership Type: Customer
                                </Link>
                                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
