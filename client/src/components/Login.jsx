import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import axiosInstance from './axiosInstance'
import { GeneralContext } from '../context/GeneralContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const { login } = useContext(GeneralContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const { data } = await axiosInstance.post('/users/login', { email, password })
            login(data)
            navigate('/home')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
            >
                <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full mix-blend-screen filter blur-[64px] opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md mb-4 shadow-sm">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-300 text-sm">Sign in to your trading dashboard</p>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="email" required
                                    value={email} onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="password" required
                                    value={password} onChange={e => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full bg-brand-600 text-white font-medium py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] disabled:opacity-70 mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">Create one</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
