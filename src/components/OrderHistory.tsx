import React, { useState } from 'react';
import { Order } from '../types';
import { Clock, Package, Image as ImageIcon, Trash2, ImagePlus } from 'lucide-react';

export const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => 
    JSON.parse(localStorage.getItem('orders') || '[]')
      .filter((order: any) => order && order.customerDetails)
  );
  const [confirmingRemoval, setConfirmingRemoval] = useState<{ orderId: string; imageIndex: number } | null>(null);

  const handleImageAttach = (orderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order => {
              if (order.id === orderId) {
                return {
                  ...order,
                  attachedImages: [...(order.attachedImages || []), reader.result as string]
                };
              }
              return order;
            });
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            return updatedOrders;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (orderId: string, imageIndex: number) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId && order.attachedImages) {
        const newImages = order.attachedImages.filter((_, i) => i !== imageIndex);
        return {
          ...order,
          attachedImages: newImages.length > 0 ? newImages : undefined
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setConfirmingRemoval(null);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No orders yet
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4 px-0">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Clock className="h-4 w-4" />
                {new Date(order.date).toLocaleDateString()}
              </div>
              <div className="font-medium">Order #{order.id.slice(0, 8)}</div>
            </div>
            <div className="sm:text-right">
              <div className="font-semibold">RM {order.total.toFixed(2)}</div>
              <div className="text-sm text-gray-600">{order.items.length} items</div>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.title}</div>
                  <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  {item.isPreOrder && (
                    <div className="text-sm text-blue-600">Pre-order</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 border-t pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ImageIcon className="h-4 w-4" />
                <span>Attachments</span>
              </div>
              <label className="flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <ImagePlus className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Add Contributions</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageAttach(order.id, e)}
                />
              </label>
            </div>
            {order.attachedImages && order.attachedImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {order.attachedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Order attachment ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {confirmingRemoval?.orderId === order.id && confirmingRemoval?.imageIndex === index ? (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center p-2">
                          <p className="text-sm mb-2">Remove image?</p>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleRemoveImage(order.id, index)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmingRemoval(null)}
                              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingRemoval({ orderId: order.id, imageIndex: index })}
                        className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No images attached</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};