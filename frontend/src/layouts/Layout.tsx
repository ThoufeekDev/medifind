import React, { useState, useCallback, type ReactNode } from 'react';
import Sidebar from "../shared/components/Sidebar/Sidebar";
import './layout.css'

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="layout-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="layout-main">
        <header className="main-header">
          {/* LEFT SIDE: Left alone with just the mobile toggle button */}
          <div className="header-left">
            <button className="mobile-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
              ☰
            </button>
          </div>
          
          {/* RIGHT SIDE: Action Buttons, Notifications & Messages */}
          <div className="header-right">
            <button className="icon-btn" aria-label="Notifications">
              🔔<span className="badge"></span>
            </button>
            <button className="icon-btn" aria-label="Messages">✉️</button>
            <button className="btn-primary">+ New Record</button>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;