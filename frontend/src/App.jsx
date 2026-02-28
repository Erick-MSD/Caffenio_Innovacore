import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Order from './pages/Order'
import ProductList from './pages/ProductList'
import DulcesSubcategory from './pages/DulcesSubcategory'
import ProductCustomization from './pages/ProductCustomization'
import OrderSummary from './pages/OrderSummary'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="/category/:categoryId/products" element={<ProductList />} />
            <Route path="/category/:categoryId/product/customize" element={<ProductCustomization />} />
            <Route path="/category/4/subcategory" element={<DulcesSubcategory />} />
            <Route path="/category/4/:subcategoryId" element={<ProductList />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
