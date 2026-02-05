import React, { useState } from 'react';
import { Vendor } from '../types';
import { MapPin, Phone, Globe, ChevronDown, ChevronUp, Briefcase, ExternalLink } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <article
      className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md ${isExpanded ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-100 group">
          <img
            src={vendor.imageUrl}
            alt={`${vendor.name} 預覽圖`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">{vendor.name}</h3>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{vendor.city}</span>
            </div>

            <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
              {vendor.shortDescription}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-slate-500 text-sm">
                <MapPin size={16} className="mr-2 text-primary-500 shrink-0" />
                <span className="truncate">{vendor.address}</span>
              </div>
              <div className="flex items-center text-slate-500 text-sm">
                <Phone size={16} className="mr-2 text-primary-500 shrink-0" />
                <a href={`tel:${vendor.phone}`} className="hover:text-primary-600 transition-colors">
                  {vendor.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center mt-auto">
            <button
              onClick={toggleExpand}
              className="flex items-center text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded px-2 py-1 -ml-2"
              aria-expanded={isExpanded}
              aria-controls={`details-${vendor.id}`}
            >
              {isExpanded ? '收合資訊' : '查看詳情'}
              {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </button>

            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-400 text-sm hover:text-primary-600 transition-colors"
              title="前往官方網站"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          id={`details-${vendor.id}`}
          className="bg-slate-50 border-t border-slate-200 p-5 animate-fadeIn"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                <Briefcase size={16} className="mr-2 text-primary-500" />
                關於我們
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-4">
                {vendor.fullDescription}
              </p>

              <h4 className="font-bold text-slate-800 mb-2 text-sm">服務項目</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {vendor.services.map((service, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-xs px-2 py-1 rounded">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-3 text-sm">精選案例</h4>
              <ul className="space-y-2">
                {vendor.cases.map((caseItem, idx) => (
                  <li key={idx}>
                    <a
                      href={caseItem.url}
                      className="flex items-center justify-between bg-white p-3 rounded border border-slate-200 hover:border-primary-300 hover:shadow-sm transition-all group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm text-slate-700 group-hover:text-primary-700">{caseItem.title}</span>
                      <ExternalLink size={14} className="text-slate-300 group-hover:text-primary-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default VendorCard;