import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SendMoney } from './pages/SendMoney'
import { Dashboard } from './pages/Dashboard'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { ProtectedRoute } from './components/ProtectedRoute'



function App() {

  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/send" element={<ProtectedRoute element={<SendMoney />} />} />
          <Route path='/' element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
