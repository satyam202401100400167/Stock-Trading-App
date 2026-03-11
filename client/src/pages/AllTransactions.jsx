import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchT = async () => {
            try {
                const { data } = await axiosInstance.get('/transactions')
                setTransactions(data)
            } catch (error) { console.error(error) }
        }
        fetchT()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                    <Activity className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">All Transactions</h1>
                    <p className="text-slate-500 mt-1">View deposits, withdrawals, and platform activities.</p>
                </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">User ID</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t._id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-4 px-6 font-mono text-sm text-slate-500">{t.user}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${t.type === 'deposit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right font-bold text-slate-900">${t.amount?.toFixed(2)}</td>
                                    <td className="py-4 px-6 text-right text-sm text-slate-500">{new Date(t.time).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllTransactions
