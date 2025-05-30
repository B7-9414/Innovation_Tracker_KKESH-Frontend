import { Search } from 'lucide-react';
import { categories } from '../data/mockData';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-col gap-4 my-6 mx-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search ideas..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full py-3 pl-10 pr-4 bg-[#191A21] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`py-2 px-4 rounded-lg border transition-all ${
              selectedCategory === category
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-[#191A21] text-white border-gray-700 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;