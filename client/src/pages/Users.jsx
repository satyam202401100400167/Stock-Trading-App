import { useState, useEffect } from 'react'
import { Users as UsersIcon } from 'lucide-react'
import axiosInstance from '../components/axiosInstance'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axiosInstance.get('/users')
                setUsers(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                    <UsersIcon className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
                    <p className="text-slate-500 mt-1">View all registered traders on the platform.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">User Info</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div className="font-bold text-lg text-slate-900">{user.username}</div>
                                        <div className="text-sm text-slate-500">{user.email}</div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.usertype === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {user.usertype}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-right font-bold text-slate-900 text-lg">
                                        ${user.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users
