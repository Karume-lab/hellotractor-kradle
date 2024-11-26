// components/SearchBar.tsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 flex items-center justify-between w-1/2 border">
      <div className="flex items-center flex-1">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search tractors, attachments, and more..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 outline-none"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="text-gray-600 font-medium flex items-center">
            {selectedCategory} <span className="ml-2"><ChevronDown/></span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleCategoryChange('All')}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange('Tractors')}>Tractors</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange('Attachments')}>Attachments</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange('Operators')}>Operators</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCategoryChange('Dealers')}>Dealers</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchBar;