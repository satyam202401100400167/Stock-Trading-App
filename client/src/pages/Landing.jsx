import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingUp, ShieldCheck, BarChart3, Globe2 } from 'lucide-react'

const FeatureCard = ({ title, desc, icon: Icon, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
    >
        <div className="bg-brand-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Icon className="text-brand-600 w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{desc}</p>
    </motion.div>
)

const Landing = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-brand-50 to-slate-100 flex flex-col justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-brand-600 font-medium text-sm mb-6 shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                        </span>
                        Risk-Free Live Market Trading
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight"
                    >
                        Master the Market.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">Zero Financial Risk.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 mb-10"
                    >
                        Practice trading with real-time US stock market data. Build your virtual portfolio, test strategies, and become a confident investor.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/register" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-medium text-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                            Start Trading Now
                        </Link>
                        <Link to="/login" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium text-lg hover:bg-slate-50 hover:shadow-md transition-all w-full sm:w-auto">
                            Sign In to Account
                        </Link>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <FeatureCard delay={0.4} icon={Globe2} title="Real-Time Data" desc="Live US stock prices and market trends for accurate paper trading simulations." />
                    <FeatureCard delay={0.5} icon={BarChart3} title="Strategy Testing" desc="Analyze historical data and use robust portfolio management tools to refine strategies." />
                    <FeatureCard delay={0.6} icon={ShieldCheck} title="Risk-Free Learning" desc="Simulate buying and selling with $100,000 in virtual funds without spending a dime." />
                </div>
            </div>
        </div>
    )
}

export default Landing
