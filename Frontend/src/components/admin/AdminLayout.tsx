import React, { useState } from 'react'
import AdminSidebar from './common/SideBar'
import AdminHeader from './common/Header'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="admin-layout min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content Area - Always has left margin on desktop */}
      <div className="admin-main-content min-h-screen lg:ml-64">
        {/* Header */}
        <AdminHeader onSidebarToggle={toggleSidebar} />
        
        {/* Page Content */}
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
