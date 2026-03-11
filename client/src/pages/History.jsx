import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { History as HistoryIcon } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'

const History = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await axiosInstance.get('/orders/myorders')
                setOrders(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-brand-100 p-4 rounded-2xl text-brand-600">
                    <HistoryIcon className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Trading History</h1>
                    <p className="text-slate-500 mt-1">Review your past orders and execution prices.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Order Details</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Shares</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Exec. Price</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-16 px-6 text-center text-slate-500">
                                        No trading history found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-4">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block w-20 text-center ${order.orderType === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {order.orderType}
                                                </span>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">{order.symbol}</div>
                                                    <div className="text-sm text-slate-500">{order.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-right font-semibold text-slate-700 text-lg">{order.count}</td>
                                        <td className="py-5 px-6 text-right text-slate-600 text-lg">${order.price.toFixed(2)}</td>
                                        <td className="py-5 px-6 text-right font-bold text-slate-900 text-lg">${order.totalPrice.toFixed(2)}</td>
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

export default History
