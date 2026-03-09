import React, { useState, useEffect, useMemo } from 'react';
import { fetchVendors } from './services/sheetService';
import { Vendor, FilterState, CATEGORY_ALL } from './types';
import VendorCard from './components/VendorCard';
import FilterBar from './components/FilterBar';
import { Loader2, AlertCircle } from 'lucide-react';
import DisclaimerModal from './components/DisclaimerModal';

const App: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    category: CATEGORY_ALL,
    city: ''
  });

  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(6);
  const observerTarget = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchVendors();
        setVendors(data);
        setError(null);
      } catch (err: any) {
        console.error("Load data error:", err);
        setError(err.message || '無法載入廠商資料，請稍後再試。');
      } finally {
        setLoading(false);
      }
    };
    loadData();

  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  // Unique cities for filter
  const cities = useMemo(() => {
    return Array.from(new Set(vendors.map(v => v.city))).sort();
  }, [vendors]);

  // Unique categories for filter (Dynamic!)
  const categories = useMemo(() => {
    // Filter out empty or null categories and sort
    const allCats = vendors.map(v => v.category).filter(Boolean);
    return Array.from(new Set(allCats)).sort();
  }, [vendors]);

  // Filtering Logic
  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      const matchKeyword =
        vendor.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        vendor.services.some(s => s.toLowerCase().includes(filters.keyword.toLowerCase()));

      const matchCategory = filters.category === CATEGORY_ALL || vendor.category === filters.category;

      const matchCity = filters.city === '' || vendor.city === filters.city;

      return matchKeyword && matchCategory && matchCity;
    });
  }, [vendors, filters]);

  // Set up Intersection Observer for Infinite Scroll
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredVendors.length) {
          setVisibleCount(prev => prev + 6);
        }
      },
      { threshold: 1.0, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loading, visibleCount, filteredVendors.length]);

  // Infinite Scroll Current Data
  const currentVendors = filteredVendors.slice(0, visibleCount);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisibleCount(6); // Reset to initial count on filter change
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">

      {/* Header removed as requested */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">

        {/* Intro */}
        <section className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight leading-tight">
            高雄大學城哈佛大樓
          </h2>
          <p className="text-3xl md:text-4xl text-slate-600 font-medium">
            特約廠商優惠資訊
          </p>
        </section>

        {/* Filter */}
        <FilterBar
          filters={filters}
          cities={cities}
          categories={categories}
          onFilterChange={handleFilterChange}
          totalResults={filteredVendors.length}
        />

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={48} />
            <span className="ml-3 text-slate-500 font-medium">資料載入中...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400 mb-2">找不到符合條件的廠商</p>
            <button
              onClick={() => setFilters({ keyword: '', category: CATEGORY_ALL, city: '' })}
              className="text-primary-600 font-medium hover:underline"
            >
              清除所有篩選條件
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {currentVendors.map((vendor, index) => (
                <VendorCard key={vendor.id} vendor={vendor} index={index} />
              ))}
            </div>

            {/* Infinite Scroll Sentinel */}
            {visibleCount < filteredVendors.length && (
              <div
                ref={observerTarget}
                className="w-full h-8 mt-4 flex justify-center items-center"
              >
                <Loader2 className="animate-spin text-slate-300" size={24} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="text-2xl md:text-3xl font-bold tracking-wider text-center">
            &copy; {new Date().getFullYear()} 高雄大學城哈佛大樓
          </div>
        </div>
      </footer>

      {/* Mandatory Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal onAccept={handleAcceptDisclaimer} />
      )}
    </div>
  );
};

export default App;