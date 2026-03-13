import { useState } from 'react';

const Header = ({ onSearch, onFilterChange, currentFilter }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100 mb-8 backdrop-blur-md bg-white/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
             <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-bold text-xl mr-3">
               ✓
             </div>
             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tasks Manger</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-xl">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm bg-gray-50/50"
                />
                <svg 
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all whitespace-nowrap"
              >
                Search
              </button>
              {searchValue && (
                <button 
                  type="button"
                  onClick={() => {
                    setSearchValue('');
                    onSearch(''); // Reset instantly
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl shadow-sm transition-all whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </form>

            {/* Filter Dropdown */}
            <select
              value={currentFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-4 pr-10 py-2 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-gray-600 appearance-none min-w-[140px]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.75rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
            >
              <option value="ALL">All Tasks</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
