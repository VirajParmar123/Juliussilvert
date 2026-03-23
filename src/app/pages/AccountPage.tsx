import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useFavorites } from '../context/FavoritesContext';
import { useRequisitionLists } from '../context/RequisitionListsContext';
import { ListPlus, Trash2, X } from 'lucide-react';

type TabType = 'dashboard' | 'account-info' | 'address-book' | 'orders' | 'order-guide' | 'wishlist';

const VALID_TABS: TabType[] = [
  'dashboard',
  'account-info',
  'address-book',
  'orders',
  'order-guide',
  'wishlist',
];

function isTab(s: string): s is TabType {
  return (VALID_TABS as readonly string[]).includes(s);
}

function formatListDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

export function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListNotes, setNewListNotes] = useState('');
  const { favorites, removeFavorite } = useFavorites();
  const { lists, createList, removeList } = useRequisitionLists();

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t && isTab(t)) setActiveTab(t);
    else if (!t) setActiveTab('dashboard');
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get('tab') === 'order-guide' && searchParams.get('new') === '1') {
      setCreateModalOpen(true);
    }
  }, [searchParams]);

  const selectTab = (tab: TabType) => {
    setActiveTab(tab);
    setCreateModalOpen(false);
    if (tab === 'dashboard') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewListName('');
    setNewListNotes('');
    const next = new URLSearchParams(searchParams);
    if (next.has('new')) {
      next.delete('new');
      setSearchParams(next, { replace: true });
    }
  };

  const handleCreateListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createList(newListName, newListNotes);
    closeCreateModal();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-2xl font-medium mb-6">Account Information</h2>
            
            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <button className="text-sm text-[#6b8e6f] hover:text-[#5a7a5e]">✎ Edit</button>
              </div>
              <p className="text-gray-700 mb-3">parmar89@rowan.edu</p>
              <button type="button" className="text-sm text-brand-header hover:underline">
                Change Password
              </button>
            </div>

            {/* Address Book */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Address Book</h3>
                <button className="text-sm text-[#6b8e6f] hover:text-[#5a7a5e] underline">
                  Manage Addresses
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-medium mb-2">Default Shipping Address</h4>
                <p className="text-gray-600">You have not set a default shipping address.</p>
              </div>
            </div>

            {/* My Wish List */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                My Wish List <span className="text-gray-500 font-normal">({favorites.length} item{favorites.length !== 1 ? 's' : ''})</span>
              </h3>
              
              {favorites.length > 0 ? (
                <div className="space-y-3">
                  {favorites.map((product) => (
                    <div key={product.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.weight}</p>
                          <p className="text-lg font-semibold text-gray-900 mt-1">{product.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-600">
                  Your wishlist is empty
                </div>
              )}
            </div>
          </div>
        );

      case 'account-info':
        return (
          <div>
            <h2 className="text-2xl font-medium mb-6">Account Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="parmar89@rowan.edu"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input 
                  type="text" 
                  defaultValue="John"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Parmar"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
              </div>
              <button className="px-6 py-2.5 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'address-book':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium">Address Book</h2>
              <button className="px-6 py-2.5 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors">
                Add New Address
              </button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
              <p className="mb-4">You have no saved addresses yet.</p>
              <p className="text-sm">Add a new address to save it for future orders.</p>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-medium mb-6">My Orders</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
              <p className="mb-4">You haven't placed any orders yet.</p>
              <p className="text-sm">When you do, they'll appear here.</p>
            </div>
          </div>
        );

      case 'order-guide':
        return (
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-medium">Order Guide/Requisition Lists</h2>
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors text-sm font-medium"
              >
                <ListPlus className="w-4 h-4 shrink-0" />
                Create new requisition list
              </button>
            </div>

            {lists.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600 border border-gray-100">
                <p className="mb-2 font-medium text-gray-800">No requisition lists yet</p>
                <p className="text-sm mb-6">Create a list to save SKUs and reorder faster.</p>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-header hover:bg-brand-header-hover text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <ListPlus className="w-4 h-4" />
                  Create your first list
                </button>
              </div>
            ) : (
              <ul className="space-y-3">
                {lists.map((list) => (
                  <li
                    key={list.id}
                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{list.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Created {formatListDate(list.createdAt)}</p>
                      {list.notes ? (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{list.notes}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeList(list.id)}
                      className="shrink-0 inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                      aria-label={`Delete ${list.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div>
            <h2 className="text-2xl font-medium mb-6">
              My Wishlist <span className="text-gray-500 font-normal">({favorites.length} item{favorites.length !== 1 ? 's' : ''})</span>
            </h2>
            
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="relative mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded"
                      />
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.weight}</p>
                    <p className="text-xl font-semibold text-gray-900">{product.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
                <p className="mb-4">Your wishlist is empty.</p>
                <p className="text-sm">Add items to your wishlist by clicking the heart icon on products.</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      
      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 outline-none"
      >
        <h1 className="text-3xl sm:text-4xl font-medium mb-6 sm:mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => selectTab('dashboard')}
                className={`w-full text-left px-6 py-3.5 text-sm font-medium transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-brand-header text-white' 
                    : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                Account Dashboard
              </button>
              <button
                type="button"
                onClick={() => selectTab('account-info')}
                className={`w-full text-left px-6 py-3.5 text-sm transition-colors ${
                  activeTab === 'account-info' 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                Account Information
              </button>
              <button
                type="button"
                onClick={() => selectTab('address-book')}
                className={`w-full text-left px-6 py-3.5 text-sm transition-colors ${
                  activeTab === 'address-book' 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                Address Book
              </button>
              <button
                type="button"
                onClick={() => selectTab('orders')}
                className={`w-full text-left px-6 py-3.5 text-sm transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={() => selectTab('order-guide')}
                className={`w-full text-left px-6 py-3.5 text-sm transition-colors ${
                  activeTab === 'order-guide' 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                Order Guide/Requisition Lists
              </button>
              <button
                type="button"
                onClick={() => selectTab('wishlist')}
                className={`w-full text-left px-6 py-3.5 text-sm transition-colors ${
                  activeTab === 'wishlist' 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                My Wishlist
              </button>
              <button className="w-full text-left px-6 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200">
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>

      <Footer />

      {createModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-list-title"
        >
          <div className="w-full max-w-md max-h-[min(90vh,720px)] overflow-y-auto overscroll-contain rounded-xl bg-white shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h3 id="create-list-title" className="text-lg font-semibold text-gray-900">
                New requisition list
              </h3>
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateListSubmit} className="p-5 space-y-4">
              <div>
                <label htmlFor="req-list-name" className="block text-sm font-medium text-gray-800 mb-1.5">
                  List name <span className="text-red-600">*</span>
                </label>
                <input
                  id="req-list-name"
                  type="text"
                  required
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g. Weekly produce, March banquet"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header"
                />
              </div>
              <div>
                <label htmlFor="req-list-notes" className="block text-sm font-medium text-gray-800 mb-1.5">
                  Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="req-list-notes"
                  rows={3}
                  value={newListNotes}
                  onChange={(e) => setNewListNotes(e.target.value)}
                  placeholder="Delivery window, PO reference, or items to add later…"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm resize-y min-h-[88px] focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-lg"
                >
                  Create list
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
