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
import Sidebar from '@/components/Layout/Sidebar';
import MainContent from '@/components/Layout/MainContent';


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

  if (!isAuthenticated) {
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
      <Sidebar
        sidebarOpen={sidebarOpen}
        hoveredSidebar={hoveredSidebar}
        toggleSidebar={toggleSidebar}
        setHoveredSidebar={setHoveredSidebar}
      />


      {/* Main Content */}
      <MainContent toggleSidebar={toggleSidebar}>
        {children}
      </MainContent>

  
    </div>
  );
};

export default Layout;