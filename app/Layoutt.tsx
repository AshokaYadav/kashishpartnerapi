'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { FaHouse, FaShopify, FaCreditCard, FaCircleUser, FaGift } from "react-icons/fa6"; // or use from `fa` if using older version
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/auth/authSlice';


const Layout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('side1');
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [hoveredSidebar, setHoveredSidebar] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // 1. Clear Redux state
    router.push('/login'); // 2. Redirect to Login page
  };



  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      router.push('/Login');
    }
  }, [isAuthenticated]);

  if(!isAuthenticated){
    return <div>
      <main>
          {children}
        </main>
        </div>
  }

  return (
    <div className={`min-h-screen flex flex-col ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
      <Head>
        <title>AeronPay Dashboard</title>
       </Head>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Sidebar */}
      <aside
        onMouseEnter={() => {
          if (!sidebarOpen) {
            setHoveredSidebar(true);
            // setSidebarOpen(true);

          }
        }}
        onMouseLeave={() => {
          if (!sidebarOpen) {
            setHoveredSidebar(false);
            // setSidebarOpen(false);
          }
        }}
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-all duration-300 ease-in-out  ${sidebarOpen || hoveredSidebar ? 'w-64' : 'w-20'}`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <Link href="/" className="flex items-center min-w-max">
            <Image
              src="/login/image.png"
              alt="AeronPay Logo"
              width={40}
              height={40}
              className="transition-all rounded-lg"
            />
            {(sidebarOpen || hoveredSidebar) && (
              <span className="text-xl font-bold text-blue-600 ml-2 whitespace-nowrap transition-opacity duration-300">
                Kashish India
              </span>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-19 h-19 rounded-full border-2 border-gray-100 shadow-sm overflow-hidden transition-all">
              <Image
                src="/login/ashoka.jpg"
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            {(sidebarOpen || hoveredSidebar) && (
              <div className="text-center space-y-0.5 transition-opacity duration-300">
                <h4 className="font-semibold text-gray-800 text-md whitespace-nowrap">{user?.name}</h4>
                <span className="text-gray-500 text-xs font-medium">Customer</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Enhanced transitions */}
        <nav className="p-4 overflow-hidden">
          <ul className="space-y-1">
            <li>
              <Link href="/" className={`flex items-center p-3 rounded-lg transition-all duration-200${(sidebarOpen || hoveredSidebar) ? 'px-4' : 'px-3 justify-center'
                } hover:bg-blue-50 text-blue-600`}>
                <FaHouse className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap transition-opacity duration-200">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link href="/createRegister" className={`flex items-center p-3 rounded-lg transition-all duration-200${(sidebarOpen || hoveredSidebar) ? 'px-4' : 'px-3 justify-center'
                } hover:bg-blue-50`}>
                <FaShopify className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap transition-opacity duration-200">Become a Merchant</span>}
              </Link>
            </li>
            <li>
              <Link href="/cardnew" className={`flex items-center p-3 rounded-lg transition-all duration-200${(sidebarOpen || hoveredSidebar) ? 'px-4' : 'px-3 justify-center'
                } hover:bg-blue-50`}>
                <FaCreditCard className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap transition-opacity duration-200">Prepaid Card</span>}
              </Link>
            </li>
            <li>
              <Link href="/usertransactions" className={`flex items-center p-3 rounded-lg transition-all duration-200${(sidebarOpen || hoveredSidebar) ? 'px-4' : 'px-3 justify-center'
                } hover:bg-blue-50`}>
                <FaCircleUser className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap transition-opacity duration-200">Ledger Report</span>}
              </Link>
            </li>
            <li>
              <Link href="/giftcard" className={`flex items-center p-3 rounded-lg transition-all duration-200${(sidebarOpen || hoveredSidebar) ? 'px-4' : 'px-3 justify-center'
                } hover:bg-blue-50`}>
                <FaGift className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap transition-opacity duration-200">Gift Card</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 text-gray-600 hover:text-gray-800"
              >
                <FiMenu size={24} /> {/* Hamburger Icon */}
              </button>
              {/* <Image src="/logo.png" alt="AeronPay" width={120} height={40} /> */}
            </div>




            <div className="flex items-center space-x-4">
              {/* <button
                onClick={toggleRightSidebar}
                className="relative text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}

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

        {/* Main Content Area */}
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

      {/* Right Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Notifications</h3>
          <button onClick={toggleRightSidebar} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-4">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'side1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('side1')}
            >
              <i className="fas fa-comments mr-2"></i> Chat
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'side2' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('side2')}
            >
              <i className="fas fa-bell mr-2"></i> Notifications
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'side3' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('side3')}
            >
              <i className="fas fa-users mr-2"></i> Friends
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'side1' && (
              <div className="space-y-4">
                {/* Chat notifications would go here */}
              </div>
            )}
            {activeTab === 'side2' && (
              <div className="space-y-4">
                {/* General notifications would go here */}
              </div>
            )}
            {activeTab === 'side3' && (
              <div className="space-y-4">
                {/* Friends list would go here */}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <input type="checkbox" id="mobile-menu-toggle" className="hidden" />
        <label htmlFor="mobile-menu-toggle" className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer">
          <i className="fas fa-bars text-xl"></i>
        </label>

        <div className="absolute bottom-full right-0 mb-4 hidden">
          <div className="bg-white rounded-lg shadow-lg p-2 space-y-2">
            <Link href="/logout" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
              <i className="fas fa-power-off"></i>
            </Link>
            <Link href="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
              <i className="fas fa-user"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              {/* Modal content would go here */}
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;