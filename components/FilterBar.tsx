import React from 'react';
import { FilterState, CATEGORY_ALL } from '../types';
import { Search, Filter, MapPin } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  cities: string[];
  categories: string[];
  onFilterChange: (key: keyof FilterState, value: string) => void;
  totalResults: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, cities, categories, onFilterChange, totalResults }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 sticky top-4 z-10">
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="搜尋廠商名稱或服務關鍵字..."
            className="pl-10 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm transition-all"
            value={filters.keyword}
            onChange={(e) => onFilterChange('keyword', e.target.value)}
          />
        </div>

        {/* Filters Group */}
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">

          {/* Category Dropdown */}
          <div className="relative min-w-[140px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-slate-500" />
            </div>
            <select
              className="pl-9 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value={CATEGORY_ALL}>{CATEGORY_ALL}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="relative min-w-[120px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-slate-500" />
            </div>
            <select
              className="pl-9 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={filters.city}
              onChange={(e) => onFilterChange('city', e.target.value)}
            >
              <option value="">所有地區</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Result Count Badge */}
          <div className="flex items-center justify-center bg-slate-100 text-slate-500 px-3 rounded-lg text-sm whitespace-nowrap min-w-[80px]">
            {totalResults} 筆資料
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterBar;