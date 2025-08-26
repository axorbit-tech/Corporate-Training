import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, LogIn, ArrowLeft, Send } from "lucide-react"
import { useAdminLoginMutation, useForgotPasswordRequestMutation } from "../../../store/slices/apiSlice"
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../utils/toast";

interface LoginFormData {
  email: string
  password: string
}

interface ForgotPasswordData {
  email: string
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordData>({
    email: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [error, setError] = useState("")
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [login, { isLoading }] = useAdminLoginMutation()
  const [forgotPassword] = useForgotPasswordRequestMutation()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setForgotPasswordData({ email: value })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Call login mutation
      const res = await login(formData).unwrap()

      if(res.success) {
        setFormData({
          email: "",
          password: "",
        })

        // Store token in local storage
        localStorage.setItem("adminToken", res.token)

        // Redirect to admin dashboard on success
        navigate("/admin")
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login failed:", err)
    }
  }

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setForgotPasswordLoading(true)

    try {
      
      const res = await forgotPassword(forgotPasswordData).unwrap()

      if(res.success) {
        successToast("Password reset link has been sent to your email!")
        setForgotPasswordData({ email: "" })
        setShowForgotPassword(false)
      } else {
        errorToast(res.error)
      }
      
    } catch (err) {
      toast.error("Failed to send password reset email. Please try again.")
      console.error("Forgot password failed:", err)
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword)
    setError("")
    setForgotPasswordData({ email: "" })
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
            <h1 className="login-title text-2xl font-bold text-slate-900 mb-2">
              {showForgotPassword ? "Forgot Password" : "Admin Login"}
            </h1>
            <p className="login-subtitle text-slate-600">
              {showForgotPassword 
                ? "Enter your email to reset your password" 
                : "Sign in to access the admin panel"
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Forgot Password Form */}
          {showForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form space-y-6">
              {/* Back to Login */}
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="back-to-login flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </button>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="forgot-email" className="form-label block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="input-container relative">
                  <div className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="forgot-email"
                    name="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordChange}
                    placeholder="Enter your email address"
                    className="email-input w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="forgot-password-button w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {forgotPasswordLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Login Form */
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
                <button
                  type="button"
                  onClick={toggleForgotPassword}
                  className="forgot-password text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="login-button w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          )}
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