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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 z-10">
      <div className="flex flex-col gap-4">

        {/* Row 1: Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="搜尋廠商名稱或服務關鍵字..."
            className="pl-10 w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-base transition-all"
            value={filters.keyword}
            onChange={(e) => onFilterChange('keyword', e.target.value)}
          />
        </div>

        {/* Row 2: Filters Grid (Category + City) */}
        <div className="grid grid-cols-2 gap-4">

          {/* Category Dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-slate-500" />
            </div>
            <select
              className="pl-10 w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-base appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
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
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-slate-500" />
            </div>
            <select
              className="pl-10 w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-base appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={filters.city}
              onChange={(e) => onFilterChange('city', e.target.value)}
            >
              <option value="">所有地區</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Row 3: Result Count */}
        <div className="text-right text-slate-500 text-sm mt-1">
          共找到 <span className="text-primary-600 font-bold">{totalResults}</span> 家符合條件的廠商
        </div>

      </div>
    </div>
  );
};

export default FilterBar;