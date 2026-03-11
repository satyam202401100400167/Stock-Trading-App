import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Activity } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'
import { GeneralContext } from '../context/GeneralContext'

const Home = () => {
    const { user } = useContext(GeneralContext)
    const [stocks, setStocks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const { data } = await axiosInstance.get('/stocks')
                setStocks(data.length > 0 ? data : [
                    { _id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, isDefault: true },
                    { _id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 330.20, isDefault: true },
                    { _id: '3', symbol: 'TSLA', name: 'Tesla Inc.', price: 215.80, isDefault: true },
                    { _id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 135.10, isDefault: true },
                    { _id: '5', symbol: 'NVDA', name: 'Nvidia Corp.', price: 450.00, isDefault: true }
                ])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchStocks()
    }, [])

    const filteredStocks = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Market Overview</h1>
                    <p className="text-slate-500 mt-1">Discover and trade top US stocks risk-free.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search symbols or companies..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredStocks.map((stock, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={stock._id} 
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Activity className="w-24 h-24 text-brand-600" />
                            </div>
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{stock.symbol}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-1">{stock.name}</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 mb-6 relative z-10">
                                <span className="text-3xl font-semibold text-slate-900 tracking-tight">
                                    ${Number(stock.price).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex gap-3 relative z-10">
                                <Link 
                                    to={`/trade/${stock.symbol}?type=buy&price=${stock.price}&name=${stock.name}`}
                                    className="flex-1 bg-green-500 text-white text-center py-2.5 rounded-xl font-medium hover:bg-green-600 transition-colors shadow-sm"
                                >
                                    Buy
                                </Link>
                                <Link 
                                    to={`/trade/${stock.symbol}?type=sell&price=${stock.price}&name=${stock.name}`}
                                    className="flex-1 bg-red-500 text-white text-center py-2.5 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    Sell
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                    
                    {filteredStocks.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100 border-dashed">
                            No stocks found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home
