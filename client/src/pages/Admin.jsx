import { Link } from 'react-router-dom'
import { Users, FileText, Activity, TrendingUp } from 'lucide-react'

const AdminCard = ({ title, icon: Icon, to, colorText, colorBg }) => (
    <Link to={to} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center justify-center text-center gap-6 group cursor-pointer relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 ${colorBg} opacity-10 rounded-full mix-blend-overlay filter blur-[24px] group-hover:opacity-20 transition-opacity`}></div>
        <div className={`p-5 rounded-2xl ${colorBg} bg-opacity-10 group-hover:scale-110 group-hover:rotate-3 transition-all relative z-10`}>
            <Icon className={`w-10 h-10 ${colorText}`} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 relative z-10">{title}</h3>
    </Link>
)

const Admin = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-14 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                    <Activity className="w-8 h-8 text-purple-600" />
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Admin Dashboard</h1>
                <p className="text-slate-500 text-xl max-w-2xl mx-auto">Manage the platform, monitor user activities, and oversee all trades globally.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto md:px-12">
                <AdminCard to="/admin/users" title="Manage Users" icon={Users} colorText="text-blue-600" colorBg="bg-blue-500" />
                <AdminCard to="/admin/orders" title="All Orders" icon={FileText} colorText="text-emerald-600" colorBg="bg-emerald-500" />
                <AdminCard to="/admin/transactions" title="All Transactions" icon={Activity} colorText="text-orange-600" colorBg="bg-orange-500" />
                <AdminCard to="/home" title="Market Overview" icon={TrendingUp} colorText="text-purple-600" colorBg="bg-purple-500" />
            </div>
        </div>
    )
}

export default Admin
