import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Trade from './pages/Trade'
import History from './pages/History'

import Admin from './pages/Admin'
import Users from './pages/Users'
import AllOrders from './pages/AllOrders'
import AllTransactions from './pages/AllTransactions'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/trade/:symbol" element={<Trade />} />
          <Route path="/history" element={<History />} />
          
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/admin/transactions" element={<AllTransactions />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
