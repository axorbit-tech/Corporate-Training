import React, { useState } from 'react'
import { LayoutDashboard, Users, Calendar, FileText, MessageSquare, UserCheck, ChevronDown, ChevronRight, LogOut, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CustomModal from './CustomeModal'


interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [open, setOpen] = useState(false);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const handleLogout = () => {
    setOpen(true)
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
      active: true
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: Users,
      href: '/admin/clients',
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      submenu: [
        { label: 'All Appointments', href: '/admin/appointments' },
        { label: 'Today\'s Schedule', href: '/admin/appointments/today' },
        { label: 'Upcoming', href: '/admin/appointments/upcoming' },
        { label: 'Cancelled', href: '/admin/appointments/cancelled' }
      ]
    },
    {
      id: 'trainers',
      label: 'Trainers',
      icon: UserCheck,
      href: '/admin/trainers'
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: FileText,
      submenu: [
        { label: 'Blog Posts', href: '/admin/blogs' },
        { label: 'Events', href: '/admin/events' },
        { label: 'Services', href: '/admin/services' },
      ]
    },
    {
      id: 'requests',
      label: 'Requests',
      icon: MessageSquare,
      badge: '24'
    },
    // {
    //   id: 'analytics',
    //   label: 'Analytics',
    //   icon: BarChart3,
    //   href: '/admin/analytics'
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: Settings,
    //   submenu: [
    //     { label: 'General', href: '/admin/settings/general' },
    //     { label: 'Users & Permissions', href: '/admin/settings/users' },
    //     { label: 'Integrations', href: '/admin/settings/integrations' },
    //     { label: 'Backup', href: '/admin/settings/backup' }
    //   ]
    // }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Always Fixed */}
      <aside className={`
        admin-sidebar fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>

        {/* Sidebar Header - Fixed at top */}
        <div className="sidebar-header flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="sidebar-title text-lg font-bold text-gray-900">
                Admin Panel
              </h2>
              <p className="sidebar-subtitle text-xs text-gray-500">
                Corporate Council
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation Menu - Scrollable middle section */}
        <nav className="sidebar-nav flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.submenu ? (
                  // Menu with Submenu
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`
                        nav-item w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${expandedMenus.includes(item.id)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {expandedMenus.includes(item.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* Submenu */}
                    {expandedMenus.includes(item.id) && (
                      <ul className="mt-2 ml-8 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <li key={index}>
                            <a
                              onClick={() => navigate(subItem.href)}
                              className="submenu-item flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                            >
                              <span>{subItem.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular Menu Item
                  <a
                    href={item.href}
                    className={`
                      nav-item flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${item.active
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`
                        badge text-xs px-2 py-1 rounded-full font-medium
                        ${item.active
                          ? 'bg-white/20 text-white'
                          : 'bg-red-100 text-red-600'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer - Fixed at bottom */}
        <div className="sidebar-footer border-t border-gray-200 p-4 flex-shrink-0">
          <button onClick={handleLogout} className="logout-btn w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span >Logout</span>
          </button>
        </div>


        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          title="Logout"
          description="Are you sure you want to logout?"
          buttonText="Logout"
          onButtonClick={() => navigate('/admin/logout')}
        />
      </aside>
    </>
  )
}

export default AdminSidebar
