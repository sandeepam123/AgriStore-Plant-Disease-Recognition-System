import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Cart from './components/Cart';
import Seeds from './components/Seeds';
import Fertilizers from './components/Fertilizers';
import Implements from './components/Implements';
import CropCare from './components/CropCare';
import Dashboard from './components/Dashboard';
import Leaf from './components/Leafd';
import AdminRoute from './AdminRoute';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaf" element={<Leaf />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/fertilizers" element={<Fertilizers />} />
        <Route path="/implements" element={<Implements />} />
        <Route path="/cropcare" element={<CropCare />} />

        {/* ✅ Admin Only */}
        <Route path="/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;