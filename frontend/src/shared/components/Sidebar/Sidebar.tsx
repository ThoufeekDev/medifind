import React from 'react';
import { SIDEBAR_ITEMS } from "../../../data/mockData";
import './sidebar.css'

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  toggleSidebar 
}) => {
  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container-el ${isOpen ? 'is-open' : ''}`}>
        {/* Brand Block */}
        <div className="sidebar-brand-wrapper">
          <div className="brand-icon-placeholder">M</div>
          <div className="brand-meta">
            <h2>MediFind</h2>
            <span className="badge-portal">Admin Portal</span>
          </div>
        </div>

        {/* Navigation Core */}
        <nav className="sidebar-nav-scroller" aria-label="Main Administration">
          {SIDEBAR_ITEMS.map((item) => {
            const isCurrent = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isCurrent ? 'is-active' : ''}`}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth <= 992) toggleSidebar();
                }}
              >
                <span className="nav-item-icon" aria-hidden="true">{item.icon}</span>
                <span className="nav-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Secure User Footprint */}
        <div className="sidebar-profile-footer">
          <div className="avatar-frame">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80" 
              alt="Admin User Profile Photo" 
              className="profile-img" 
            />
            <span className="online-indicator" title="System Active" />
          </div>
          <div className="profile-identity">
            <h4>Admin User</h4>
            <p>Chief Officer</p>
          </div>
          <button className="btn-logout-minimal" aria-label="Sign Out Actions">
            <span>⚙️</span>
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;