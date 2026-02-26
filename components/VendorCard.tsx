import React from 'react';
import { Vendor } from '../types';
import { MapPin, Phone, Globe, Tag, Briefcase } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <article
      className="flex flex-col h-full rounded-xl border border-slate-500 overflow-hidden transition-all duration-300 hover:shadow-md drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      style={{ backgroundColor: 'rgb(255, 239, 220)' }}
    >
      {/* 上半部：圖片與基本資訊 */}
      <div className="flex flex-col md:flex-row bg-white shrink-0">
        {/* 圖片區塊 */}
        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-100 group shrink-0">
          <img
            src={vendor.imageUrl}
            alt={`${vendor.name} 預覽圖`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* 基本資訊區塊 */}
        <div className="md:w-2/3 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{vendor.name}</h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors shrink-0"
                  title="前往官方網站"
                >
                  {/* 統一大小：18 */}
                  <Globe size={18} />
                </a>
                <span className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded-full">{vendor.city}</span>
              </div>
            </div>

            <p className="text-slate-700 text-base mb-4 leading-relaxed line-clamp-2 font-medium">
              {vendor.shortDescription}
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-slate-700 text-base">
                {/* 統一大小：18 */}
                <MapPin size={18} className="mr-2 text-blue-500 shrink-0" />
                <span className="truncate">{vendor.address}</span>
              </div>
              <div className="flex items-center text-slate-700 text-base">
                {/* 統一大小：18 */}
                <Phone size={18} className="mr-2 text-blue-500 shrink-0" />
                <a href={`tel:${vendor.phone}`} className="hover:text-blue-600 transition-colors">
                  {vendor.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下半部：優惠與服務區塊 */}
      <div className="flex-grow p-5 space-y-6 border-t border-slate-200/50">
        {/* 優惠內容 */}
        <div>
          <h4 className="font-bold text-slate-800 mb-2 flex items-center text-lg">
            {/* 統一大小：18 */}
            <Tag size={18} className="mr-2 text-blue-500" />
            優惠內容
          </h4>
          <div className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
            {vendor.fullDescription}
          </div>
        </div>

        {/* 服務項目 */}
        <div>
          <h4 className="font-bold text-slate-800 mb-2 flex items-center text-lg">
            {/* 統一大小：18 */}
            <Briefcase size={18} className="mr-2 text-blue-500" />
            服務項目
          </h4>
          <p className="text-slate-700 text-base leading-relaxed">
            {vendor.services.join(' · ')}
          </p>
        </div>
      </div>
    </article>
  );
};

export default VendorCard;