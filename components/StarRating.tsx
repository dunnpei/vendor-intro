import React from 'react';

interface StarRatingProps {
    rating?: number;
    reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 0, reviewCount = 0 }) => {
    // 確保評分在 0-5 之間
    const safeRating = Math.min(5, Math.max(0, rating));

    // 渲染單個星星
    const renderStar = (index: number) => {
        const fillValue = Math.min(1, Math.max(0, safeRating - index));
        const percentage = fillValue * 100;

        // 使用唯一的 ID 供漸層使用
        const gradientId = `star-gradient-${index}-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <svg
                key={index}
                viewBox="0 0 24 24"
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id={gradientId}>
                        <stop offset={`${percentage}%`} stopColor="#F4B400" />
                        <stop offset={`${percentage}%`} stopColor="#E0E0E0" />
                    </linearGradient>
                </defs>
                <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    fill={`url(#${gradientId})`}
                />
            </svg>
        );
    };

    return (
        <div className="flex items-center gap-1.5 mb-2">
            {/* 分數文字 */}
            <span className="text-sm font-bold text-slate-700">{safeRating.toFixed(1)}</span>

            {/* 五顆星星 */}
            <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => renderStar(i))}
            </div>

            {/* 評論數 */}
            <span className="text-sm text-slate-500">({reviewCount.toLocaleString()})</span>
        </div>
    );
};

export default StarRating;
