import React, { useState } from 'react';
import { Book, Category } from '../../types';
import { Search, Plus, AlertTriangle, X } from 'lucide-react';
import { books as defaultBooks } from '../../data/books';

interface BookModalProps {
  book?: Book;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const categories: Category[] = ['Fiction', 'Non-Fiction', 'Science', 'Business', 'Technology'];

const BookModal: React.FC<BookModalProps> = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState<Book>(() => {
    if (book) return { ...book };
    return {
      id: crypto.randomUUID(),
      title: '',
      author: '',
      price: 0,
      category: 'Fiction',
      image: '',
      description: '',
      inventory: 0
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'inventory' ? Number(value) : value
    }));
  };

  const isNewBook = !book;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">{isNewBook ? 'Add New Book' : 'Edit Book Details'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (RM)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                name="inventory"
                required
                min="0"
                value={formData.inventory}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {formData.inventory === 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Date</label>
                <input
                  type="date"
                  name="expectedDate"
                  value={formData.expectedDate?.split('T')[0] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {isNewBook ? 'Add Book' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : defaultBooks;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInventory = inventory.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInventoryUpdate = (id: string, newInventory: number) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, inventory: newInventory };
        // If inventory is 0, ensure expectedDate is set
        if (newInventory === 0 && !updatedItem.expectedDate) {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + 30); // Default to 30 days from now
          updatedItem.expectedDate = futureDate.toISOString().split('T')[0];
        }
        // If inventory is > 0, remove expectedDate
        if (newInventory > 0) {
          delete updatedItem.expectedDate;
        }
        return updatedItem;
      }
      return item;
    });
    setInventory(updatedInventory);
    localStorage.setItem('books', JSON.stringify(updatedInventory));
  };

  const handleBookSave = (updatedBook: Book) => {
    let updatedInventory: Book[];
    if (selectedBook) {
      // Edit existing book
      updatedInventory = inventory.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      );
    } else {
      // Add new book
      updatedInventory = [...inventory, updatedBook];
    }
    setInventory(updatedInventory);
    localStorage.setItem('books', JSON.stringify(updatedInventory));
  };

  const handleModalClose = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="h-5 w-5" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Mobile View */}
        <div className="sm:hidden">
          {filteredInventory.map((book) => (
            <div key={book.id} className="p-4 border-b last:border-b-0">
              <div className="flex gap-4">
                <img src={book.image} alt={book.title} className="h-20 w-20 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900">{book.title}</div>
                  <div className="text-sm text-gray-500">{book.author}</div>
                  <div className="mt-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {book.category}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">
                      RM {book.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Stock:</label>
                  <input
                    type="number"
                    min="0"
                    value={book.inventory}
                    onChange={(e) => handleInventoryUpdate(book.id, parseInt(e.target.value))}
                    className="w-20 px-2 py-1 border rounded focus:ring-1 focus:ring-gray-900"
                  />
                </div>
                <div className="mt-2">
                  {book.inventory === 0 ? (
                    <div className="flex items-center text-amber-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Out of Stock
                      {book.expectedDate && (
                        <span className="ml-2 text-xs">
                          Expected: {new Date(book.expectedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ) : book.inventory <= 5 ? (
                    <div className="flex items-center text-amber-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Low Stock
                    </div>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={book.image} alt={book.title} className="h-10 w-10 rounded object-cover" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">{book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    RM {book.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      value={book.inventory}
                      onChange={(e) => handleInventoryUpdate(book.id, parseInt(e.target.value))}
                      className="w-20 px-2 py-1 border rounded focus:ring-1 focus:ring-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.inventory === 0 ? (
                      <div className="flex items-center text-amber-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Out of Stock
                        {book.expectedDate && (
                          <span className="ml-2 text-xs">
                            Expected: {new Date(book.expectedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ) : book.inventory <= 5 ? (
                      <div className="flex items-center text-amber-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Low Stock
                      </div>
                    ) : (
                      <span className="text-green-600">In Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <BookModal
          book={selectedBook || undefined}
          onClose={handleModalClose}
          onSave={handleBookSave}
        />
      )}
    </div>
  );
};