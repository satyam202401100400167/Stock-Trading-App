import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'

const AllOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get('/orders')
                setOrders(data)
            } catch (error) { console.error(error) }
        }
        fetchOrders()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                    <FileText className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">All Platform Orders</h1>
                    <p className="text-slate-500 mt-1">Global view of all trades executed.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">User ID</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Asset</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Type</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Shares</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-5 px-6 font-mono text-sm text-slate-500">{order.user}</td>
                                    <td className="py-5 px-6 font-bold">{order.symbol}</td>
                                    <td className="py-5 px-6 text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.orderType === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {order.orderType}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-right font-semibold">{order.count}</td>
                                    <td className="py-5 px-6 text-right font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllOrders
