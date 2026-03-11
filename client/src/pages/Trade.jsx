import { useState, useContext, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'
import { GeneralContext } from '../context/GeneralContext'

const Trade = () => {
    const { symbol } = useParams()
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type') || 'buy'
    const priceStr = searchParams.get('price') || '0'
    const name = searchParams.get('name') || symbol
    const price = Number(priceStr)

    const { user, login } = useContext(GeneralContext)
    const navigate = useNavigate()

    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [ownedCount, setOwnedCount] = useState(0)

    useEffect(() => {
        const checkHoldings = async () => {
            if (type === 'sell') {
                try {
                    const { data } = await axiosInstance.get('/orders/myorders')
                    const hold = data.filter(o => o.symbol === symbol).reduce((acc, curr) => {
                        return curr.orderType === 'buy' ? acc + curr.count : acc - curr.count
                    }, 0)
                    setOwnedCount(hold)
                } catch (err) {
                    console.error(err)
                }
            }
        }
        checkHoldings()
    }, [symbol, type])

    const totalPrice = price * count

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (count < 1) return setError('Quantity must be at least 1')
        
        setLoading(true)
        setError('')
        try {
            await axiosInstance.post('/orders', {
                symbol, name, price, count: Number(count),
                stockType: 'delivery', orderType: type
            })
            
            const newUserBalance = type === 'buy' ? user.balance - totalPrice : user.balance + totalPrice
            login({ ...user, balance: newUserBalance })
            
            setSuccess(true)
            setTimeout(() => navigate('/portfolio'), 1500)
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${type} stock`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className={`p-8 md:p-10 ${type === 'buy' ? 'bg-green-600' : 'bg-red-600'} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-[48px] -translate-y-1/2 translate-x-1/4"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-3 tracking-wider uppercase">
                                {type === 'buy' ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
                                {type === 'buy' ? 'Buy Order' : 'Sell Order'}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">{symbol}</h1>
                            <p className="text-white/80 text-lg">{name}</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-white/80 text-sm mb-1 uppercase tracking-wider font-medium">Current Price</p>
                            <p className="text-4xl font-bold">${price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    {success ? (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                            <div className={`p-4 rounded-full ${type === 'buy' ? 'bg-green-100' : 'bg-red-100'} mb-6`}>
                                <CheckCircle2 className={`w-16 h-16 ${type === 'buy' ? 'text-green-600' : 'text-red-600'}`} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Filled!</h2>
                            <p className="text-slate-500 text-lg">Redirecting to your portfolio...</p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Available Cash</p>
                                    <p className="text-3xl font-bold text-slate-900">${(user?.balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                </div>
                                {type === 'sell' && (
                                    <div className="mt-4 sm:mt-0 sm:text-right">
                                        <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Shares Owned</p>
                                        <p className="text-3xl font-bold text-slate-900">{ownedCount}</p>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 ml-1 block mb-3">Quantity (Shares)</label>
                                    <div className="relative">
                                        <input 
                                            type="number" min="1" required
                                            value={count} onChange={e => setCount(e.target.value)}
                                            className="w-full px-6 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-2xl font-bold text-center text-slate-900 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="border-t-2 border-slate-100 pt-8 flex justify-between items-center bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
                                    <span className="text-lg text-slate-600 font-semibold uppercase tracking-wider">Estimated Total</span>
                                    <span className="text-4xl font-black text-slate-900">${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>

                                <button 
                                    disabled={loading || (type === 'buy' && totalPrice > user?.balance) || (type === 'sell' && count > ownedCount)}
                                    type="submit" 
                                    className={`w-full text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 text-xl tracking-wide ${
                                        type === 'buy' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30' : 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
                                    }`}
                                >
                                    {loading ? 'Processing...' : `Submit ${type.charAt(0).toUpperCase() + type.slice(1)} Order`}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default Trade
