import React, { useState, useEffect, useRef } from 'react';

interface SearchAndFilterProps {
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

export default function SearchAndFilter({ onSearchChange, onStatusFilterChange, onSortChange }: SearchAndFilterProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    
    // Debounce search for better performance
    setTimeout(() => {
      onSearchChange(query);
      setIsSearching(false);
    }, 300);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setIsStatusDropdownOpen(false);
    onStatusFilterChange(status);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setIsSortDropdownOpen(false);
    onSortChange(sort);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search-input"
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={handleSearchChange}

              className="w-full px-4 py-3 pl-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
              style={{
                background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '1rem'
              }}
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-4">
          {/* Status Filter */}
          <div className="relative" ref={statusDropdownRef}>
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
              style={{
                background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '1rem',
                minWidth: '140px'
              }}
            >
              <span>{statusFilter || 'All Status'}</span>
              <svg className={`h-4 w-4 ml-2 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isStatusDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full z-10 overflow-hidden" style={{
                background: 'linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(248, 250, 252) 100%)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '1rem'
              }}>
                {['All Status', 'Active', 'Complete'].map((status, index) => (
                  <div key={status}>
                    <button
                      onClick={() => handleStatusFilterChange(status === 'All Status' ? '' : status)}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 hover:bg-gray-100 ${
                        statusFilter === (status === 'All Status' ? '' : status) ? 'text-gray-900 bg-gray-100' : 'text-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                    {index < 2 && (
                      <div className="h-px mx-4" style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)',
                        boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
                      }}></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort By */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
              style={{
                background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '1rem',
                minWidth: '160px'
              }}
            >
              <span>
                {sortBy === 'date-desc' && 'Date (Newest)'}
                {sortBy === 'date-asc' && 'Date (Oldest)'}
                {sortBy === 'views-desc' && 'Views (High to Low)'}
                {sortBy === 'views-asc' && 'Views (Low to High)'}
                {sortBy === 'progress-desc' && 'Progress (High to Low)'}
                {sortBy === 'progress-asc' && 'Progress (Low to High)'}
              </span>
              <svg className={`h-4 w-4 ml-2 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSortDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full z-10 overflow-hidden" style={{
                background: 'linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(248, 250, 252) 100%)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '0.75rem'
              }}>
                {[
                  { value: 'date-desc', label: 'Date (Newest)' },
                  { value: 'date-asc', label: 'Date (Oldest)' },
                  { value: 'views-desc', label: 'Views (High to Low)' },
                  { value: 'views-asc', label: 'Views (Low to High)' },
                  { value: 'progress-desc', label: 'Progress (High to Low)' },
                  { value: 'progress-asc', label: 'Progress (Low to High)' }
                ].map((option, index) => (
                  <div key={option.value}>
                    <button
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 hover:bg-gray-100 ${
                        sortBy === option.value ? 'text-gray-900 bg-gray-100' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                    {index < 5 && (
                      <div className="h-px mx-4" style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)',
                        boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
                      }}></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
