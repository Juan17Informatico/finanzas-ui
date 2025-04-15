import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useAuth } from './contexts/AuthContext'
import Categories from './pages/Categories'
import Budgets from './pages/Budgets'
import Transactions from './pages/Transactions'

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  )
}
