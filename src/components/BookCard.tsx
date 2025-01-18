import React from "react";
import { Book } from "../types";
import { Plus, Package, CalendarClock } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...book, isPreOrder: book.inventory === 0 },
    });
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 truncate">{book.category}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`shrink-0 p-1.5 rounded-full transition-colors ${
              book.inventory === 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-900 hover:bg-gray-800"
            } text-white`}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-1.5 text-xs">
          <span className="font-medium text-gray-900">RM {book.price}</span>
          <div className="flex items-center gap-1 text-gray-600">
            {book.inventory === 0 ? (
              <>
                <CalendarClock className="text-blue-600 h-3 w-3" />
                <span className="text-blue-600">Preorder</span>
              </>
            ) : (
              <>
                <Package className="h-3 w-3" />
                <span>
                  {book.inventory <= 5 ? "Low stock" : book.inventory}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
