import React, { useState } from 'react';
import { Order } from '../types';
import { useCart } from '../contexts/CartContext';

interface CheckoutFormProps {
  onComplete: () => void;
  total: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onComplete, total }) => {
  const { state } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const order: Order = {
      id: crypto.randomUUID(),
      items: state.items,
      total,
      customerDetails: formData,
      date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...orders]));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    onComplete();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <p className="text-sm text-gray-600 mb-4">Total Amount: RM {total.toFixed(2)}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
        <textarea
          name="address"
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
          rows={3}
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}