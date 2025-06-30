'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { FaHouse, FaShopify, FaCreditCard, FaCircleUser, FaGift, FaUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface SidebarProps {
    sidebarOpen: boolean;
    hoveredSidebar: boolean;
    toggleSidebar: () => void;
    setHoveredSidebar: (value: boolean) => void;
}

const Sidebar = ({ sidebarOpen, hoveredSidebar, toggleSidebar, setHoveredSidebar }: SidebarProps) => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <aside
            onMouseEnter={() => !sidebarOpen && setHoveredSidebar(true)}
            onMouseLeave={() => !sidebarOpen && setHoveredSidebar(false)}
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

            {/* Navigation */}
            <nav className="p-4 overflow-hidden">
                <ul className="space-y-1">
                    <li>
                        <Link href="/" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50 text-blue-600`}>
                            <FaHouse className="text-lg min-w-[24px]" />
                            {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/createRegister" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                            <FaShopify className="text-lg min-w-[24px]" />
                            {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Become a Merchant</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/cardnew" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                            <FaCreditCard className="text-lg min-w-[24px]" />
                            {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Prepaid Card</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/usertransactions" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                            <FaCircleUser className="text-lg min-w-[24px]" />
                            {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Ledger Report</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/giftcard" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                            <FaGift className="text-lg min-w-[24px]" />
                            {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Gift Card</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="/Profile" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                            <FaUser className="text-lg min-w-[24px]" />
                            {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">My Profile</span>}
                        </Link>

                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
