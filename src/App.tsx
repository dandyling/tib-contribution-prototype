import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookCard } from './components/BookCard';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { OrderHistory } from './components/OrderHistory';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { OrdersManagement } from './pages/admin/OrdersManagement';
import { InventoryManagement } from './pages/admin/InventoryManagement';
import { books } from './data/books';
import { Category } from './types';
import { BookOpen, ShoppingCart, Clock, Menu, X, LayoutDashboard } from 'lucide-react';
import { CartProvider, useCart } from './contexts/CartContext';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  // Don't show header for admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
        </Route>
      </Routes>
    );
  }

  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = [];
    }
    acc[book.category].push(book);
    return acc;
  }, {} as Record<string, typeof books>);

  const categories = selectedCategory === 'All' 
    ? Object.keys(groupedBooks) 
    : [selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">BookStore</span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              <nav className="flex space-x-8">
                <Link 
                  to="/orders" 
                  className={`${location.pathname === '/orders' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 flex items-center gap-2`}
                >
                  <Clock className="h-6 w-6" />
                  <span>Orders</span>
                </Link>
                <Link
                  to="/admin/orders"
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-6 w-6" />
                  <span>Admin</span>
                </Link>
              </nav>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full flex items-center"
              >
                <ShoppingCart className="h-6 w-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {state.items.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t`}>
            <nav className="py-3 space-y-2">
              <Link 
                to="/orders" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${
                  location.pathname === '/orders' ? 'text-blue-600' : 'text-gray-600'
                } hover:text-blue-600 flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50`}
              >
                <Clock className="h-6 w-6" />
                <span>Orders</span>
              </Link>
              <Link
                to="/admin/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
              >
                <LayoutDashboard className="h-6 w-6" />
                <span>Admin</span>
              </Link>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {state.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {state.items.length}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 pb-16">
        <Routes>
          <Route path="/" element={
            <>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <div className="space-y-8">
                {categories.map(category => (
                  <div key={category}>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">{category}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
                      {groupedBooks[category].map(book => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          } />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}