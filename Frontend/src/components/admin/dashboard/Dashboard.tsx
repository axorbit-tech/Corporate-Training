import React from 'react'
import { Users, Calendar, TrendingUp, DollarSign, Clock, CheckCircle, BarChart3, ArrowUp, ArrowDown, MoreVertical } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Clients',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Appointments Today',
      value: '24',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,280',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'orange'
    }
  ]

  const recentAppointments = [
    {
      id: 1,
      client: 'John Doe',
      therapist: 'Dr. Sarah Johnson',
      time: '10:00 AM',
      type: 'Individual Counseling',
      status: 'confirmed'
    },
    {
      id: 2,
      client: 'Jane Smith',
      therapist: 'Michael Chen',
      time: '11:30 AM',
      type: 'Corporate Training',
      status: 'pending'
    },
    {
      id: 3,
      client: 'Robert Wilson',
      therapist: 'Dr. Sarah Johnson',
      time: '2:00 PM',
      type: 'Stress Management',
      status: 'confirmed'
    },
    {
      id: 4,
      client: 'Emily Davis',
      therapist: 'Michael Chen',
      time: '3:30 PM',
      type: 'Family Counseling',
      status: 'cancelled'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'New client registered',
      user: 'John Doe',
      time: '5 minutes ago',
      type: 'user'
    },
    {
      id: 2,
      action: 'Appointment scheduled',
      user: 'Jane Smith',
      time: '15 minutes ago',
      type: 'appointment'
    },
    {
      id: 3,
      action: 'Blog post published',
      user: 'Admin',
      time: '1 hour ago',
      type: 'content'
    },
    {
      id: 4,
      action: 'Payment received',
      user: 'Robert Wilson',
      time: '2 hours ago',
      type: 'payment'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500'
      case 'green':
        return 'bg-green-500'
      case 'purple':
        return 'bg-purple-500'
      case 'orange':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="admin-dashboard p-6 space-y-8">
      
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="dashboard-subtitle text-gray-600">
          Welcome back! Here's what's happening with your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`stat-icon w-12 h-12 ${getStatColor(stat.color)} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`stat-trend flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <h3 className="stat-value text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="stat-label text-sm text-gray-600">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="content-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="appointments-card bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="card-header flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="card-title text-lg font-semibold text-gray-900">
                Today's Appointments
              </h2>
              <button className="more-btn p-2 hover:bg-gray-100 rounded-md transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="appointments-list">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div className="appointment-info flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="appointment-time">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="appointment-details flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.client}
                        </p>
                        <p className="text-xs text-gray-600">
                          with {appointment.therapist} • {appointment.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer p-4 bg-gray-50 border-t border-gray-200">
              <button className="view-all-btn text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all appointments →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="activity-card bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="card-header p-6 border-b border-gray-200">
              <h2 className="card-title text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="activity-list p-6 space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item flex items-start space-x-3">
                  <div className="activity-icon w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'appointment' && <Calendar className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'content' && <BarChart3 className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="activity-content flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer p-4 bg-gray-50 border-t border-gray-200">
              <button className="view-all-btn text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all activity →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="quick-actions-grid grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="quick-action-btn bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 text-center">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Client</span>
          </button>
          <button className="quick-action-btn bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 text-center">
            <Calendar className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Schedule</span>
          </button>
          <button className="quick-action-btn bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 text-center">
            <BarChart3 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Reports</span>
          </button>
          <button className="quick-action-btn bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 text-center">
            <CheckCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Tasks</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
