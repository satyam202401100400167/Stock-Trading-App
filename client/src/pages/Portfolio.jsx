import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PieChart, DollarSign, Briefcase } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'
import { GeneralContext } from '../context/GeneralContext'

const Portfolio = () => {
    const { user } = useContext(GeneralContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get('/orders/myorders')
                setOrders(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const holdings = orders.reduce((acc, order) => {
        if (!acc[order.symbol]) {
            acc[order.symbol] = { count: 0, totalInvested: 0, name: order.name }
        }
        if (order.orderType === 'buy') {
            acc[order.symbol].count += order.count
            acc[order.symbol].totalInvested += order.totalPrice
        } else if (order.orderType === 'sell') {
            acc[order.symbol].count -= order.count
            acc[order.symbol].totalInvested -= (acc[order.symbol].totalInvested / (acc[order.symbol].count + order.count)) * order.count
        }
        return acc
    }, {})

    const activeHoldings = Object.entries(holdings).filter(([_, data]) => data.count > 0)
    const totalInvested = activeHoldings.reduce((sum, [_, data]) => sum + data.totalInvested, 0)
    const portfolioValue = (user?.balance || 0) + totalInvested

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Portfolio</h1>
                <p className="text-slate-500 mt-1">Track your performance and holdings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-brand-600 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full mix-blend-screen filter blur-[32px] opacity-70"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 opacity-80">
                            <Briefcase className="w-5 h-5" />
                            <h3 className="font-medium text-sm uppercase tracking-wider">Total Portfolio Value</h3>
                        </div>
                        <p className="text-4xl font-bold tracking-tight">${portfolioValue?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-slate-500">
                        <DollarSign className="w-5 h-5" />
                        <h3 className="font-medium text-sm uppercase tracking-wider">Available Cash</h3>
                    </div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">${(user?.balance || 0)?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-slate-500">
                        <PieChart className="w-5 h-5" />
                        <h3 className="font-medium text-sm uppercase tracking-wider">Total Invested</h3>
                    </div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">${totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </motion.div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Current Holdings</h2>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-4 px-6 font-semibold text-sm text-slate-600">Asset</th>
                                <th className="py-4 px-6 font-semibold text-sm text-slate-600 text-right">Shares</th>
                                <th className="py-4 px-6 font-semibold text-sm text-slate-600 text-right">Avg Price</th>
                                <th className="py-4 px-6 font-semibold text-sm text-slate-600 text-right">Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeHoldings.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-12 px-6 text-center text-slate-500">
                                        You don't own any stocks yet. Start <Link to="/home" className="text-brand-600 font-medium hover:underline">trading</Link>.
                                    </td>
                                </tr>
                            ) : (
                                activeHoldings.map(([symbol, data], index) => (
                                    <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900 text-lg">{symbol}</div>
                                            <div className="text-sm text-slate-500">{data.name}</div>
                                        </td>
                                        <td className="py-4 px-6 text-right font-medium text-slate-700">{data.count}</td>
                                        <td className="py-4 px-6 text-right text-slate-600">${(data.totalInvested / data.count).toFixed(2)}</td>
                                        <td className="py-4 px-6 text-right font-bold text-slate-900">${data.totalInvested.toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Portfolio
