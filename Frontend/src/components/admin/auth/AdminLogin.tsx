import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react"

interface LoginFormData {
  email: string
  password: string
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Add your authentication logic here
      console.log("Login attempt:", formData)

      // Redirect to admin dashboard on success
      window.location.href = "/admin/dashboard"
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="login-container w-full max-w-md">
        {/* Login Card */}
        <div className="login-card bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Header */}
          <div className="login-header text-center mb-8">
            <div className="logo-container w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="login-title text-2xl font-bold text-slate-900 mb-2">Admin Login</h1>
            <p className="login-subtitle text-slate-600">Sign in to access the admin panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form space-y-6">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="input-container relative">
                <div className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="email-input w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="input-container relative">
                <div className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="password-input w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options flex items-center justify-between">
              <label className="remember-me flex items-center">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="forgot-password text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-button w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer text-center mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Need help? Contact{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                support
              </a>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice text-center mt-6">
          <p className="text-xs text-slate-500">🔒 Your connection is secure and encrypted</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
