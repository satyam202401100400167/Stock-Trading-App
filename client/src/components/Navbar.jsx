import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext'
import { TrendingUp, LogOut } from 'lucide-react'

const Navbar = () => {
    const { user, logout } = useContext(GeneralContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to={user ? "/home" : "/"} className="flex items-center gap-2">
                        <div className="bg-brand-600 p-2 rounded-lg">
                            <TrendingUp className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">SB Stocks</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/portfolio" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Portfolio</Link>
                                <Link to="/history" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">History</Link>
                                {user.usertype === 'admin' && (
                                    <Link to="/admin" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">Admin panel</Link>
                                )}
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                    <div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full flex items-center gap-2">
                                        <span className="opacity-75 text-xs uppercase tracking-wider">Balance</span>
                                        <span className="font-bold">${user.balance?.toLocaleString()}</span>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-500" title="Logout">
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
                                <Link to="/register" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">Sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
