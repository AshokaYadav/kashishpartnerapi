'use client';

import { ReactNode } from 'react';
// import Header from '@/components/layout/Header'; // 🔁 Import Header
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Header from './Header';

interface MainContentProps {
  children: ReactNode;
  toggleSidebar: () => void;
}

const MainContent = ({ children, toggleSidebar }: MainContentProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex-1 flex flex-col">
      {/* ✅ Reusable Header */}
      <Header toggleSidebar={toggleSidebar} />

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
