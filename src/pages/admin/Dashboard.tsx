import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList, Menu, X, Home } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-lg font-semibold">Admin Dashboard</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        transition-transform duration-200
        fixed lg:static
        inset-0 lg:inset-auto
        z-40 lg:z-0
        w-64 
        bg-gray-900 
        text-white 
        p-6
        h-screen
      `}>
        <div className="hidden lg:flex items-center gap-2 mb-8">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-lg font-semibold">Admin Dashboard</span>
        </div>
        
        <nav className="space-y-2">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
          >
            <Home className="h-5 w-5" />
            <span>Back to Store</span>
          </Link>
          <div className="border-t border-gray-700 my-4"></div>
          <Link
            to="/admin/orders"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ClipboardList className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link
            to="/admin/inventory"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Package className="h-5 w-5" />
            <span>Inventory</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};