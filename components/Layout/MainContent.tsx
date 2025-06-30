'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';

interface MainContentProps {
  children: ReactNode;
  toggleSidebar: () => void;
}

const MainContent = ({ children, toggleSidebar }: MainContentProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
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
              <button className="flex items-center space-x-2">
                <Image
                  src="/image.png"
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>

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
                    <i className="fas fa-cog mr-2"></i> {user?.email}
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    <i className="fas fa-inbox mr-2"></i> Membership Type: Customer
                  </Link>
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    <i className="fas fa-sliders-h mr-2"></i> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <span>Copyright © 2025. Kashish India PVT LTD. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default MainContent;
