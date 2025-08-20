import { AlertTriangle, RefreshCw } from "lucide-react"

export default function SomethingWentWrong() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="admin-error-container min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="admin-error-content max-w-md w-full">
        {/* Error Icon */}
        <div className="admin-error-icon text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="admin-error-message text-center mb-8">
          <h1 className="admin-error-title text-2xl font-bold text-gray-900 mb-3">Something Went Wrong</h1>
          <p className="admin-error-description text-gray-600 leading-relaxed">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        <div className="admin-error-actions">
          <button
            onClick={handleRetry}
            className="admin-retry-btn w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  )
}
