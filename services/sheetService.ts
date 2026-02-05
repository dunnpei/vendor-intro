import { Vendor, CaseStudy, CATEGORY_ALL } from '../types';

/**
 * MOCK DATA
 * Used when VITE_GOOGLE_SHEET_API_URL is not set.
 */
const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: '極光數位設計',
    imageUrl: 'https://images.unsplash.com/photo-1467232004560-64a512d22f7d?auto=format&fit=crop&q=80&w=800',
    shortDescription: '專注於高互動性的品牌形象網站設計，讓您的品牌脫穎而出。',
    fullDescription: '極光數位設計成立於 2015 年，擁有多年的跨國專案經驗。我們擅長使用最新的前端技術 (React, Vue, WebGL) 打造令人驚艷的視覺效果。我們的設計哲學是「少即是多」，致力於提供使用者最直覺的操作體驗。\n\n我們提供全方位的數位解決方案，從策略規劃、視覺設計到程式開發，一條龍服務確保品質一致性。',
    address: '台北市信義區信義路五段7號',
    phone: '02-2345-6789',
    website: 'https://example.com',
    category: '企業形象',
    city: '台北市',
    services: ['RWD 響應式設計', 'UI/UX 設計', '品牌識別', 'SEO 優化'],
    cases: [
      { title: '科技巨頭年度形象頁', url: '#' },
      { title: '時尚品牌線上展覽', url: '#' }
    ],
    updatedAt: '2025-02-05'
  },
  {
    id: '2',
    name: '雲端電商整合',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
    shortDescription: '一站式電商解決方案，協助傳統產業數位轉型。',
    fullDescription: '我們不僅僅是網頁設計公司，更是您的生意夥伴。專精於 Shopify 與 WordPress WooCommerce 系統建置，並提供完整的金流、物流串接服務。\n\n團隊內配有專業的數位行銷顧問，從建站到導流一次搞定，讓您的網路商店不只是好看，更會賣！',
    address: '台中市西屯區台灣大道三段',
    phone: '04-2255-8888',
    website: 'https://example.com',
    category: '電商購物',
    city: '台中市',
    services: ['購物車系統', '金流串接', '會員系統', '庫存管理 API'],
    cases: [
      { title: '在地小農購物網', url: '#' },
      { title: '流行服飾旗艦店', url: '#' }
    ]
  },
  {
    id: '3',
    name: '南風互動工作室',
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800',
    shortDescription: '南部首選，在地化服務，高CP值的活動頁面製作。',
    fullDescription: '深耕高雄在地十年，我們了解在地企業的需求。專長於快速製作行銷 Landing Page 與活動網站。\n價格透明，溝通順暢，是中小企業與新創團隊的最佳選擇。',
    address: '高雄市苓雅區海邊路',
    phone: '07-330-1234',
    website: 'https://example.com',
    category: '活動頁面',
    city: '高雄市',
    services: ['一頁式網頁', '活動報名系統', 'Google Analytics 設定'],
    cases: [
      { title: '音樂節活動官網', url: '#' },
      { title: '建案預約賞屋頁', url: '#' }
    ]
  },
  {
    id: '4',
    name: '全端系統專家',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=800',
    shortDescription: '複雜邏輯與大型資料庫系統開發，客製化 ERP/CRM。',
    fullDescription: '當套版網站無法滿足您的需求時，就是我們出場的時候。我們專注於後端架構設計、資料庫優化以及高併發處理。\n適合需要高度客製化內部管理系統的企業，確實提升營運效率。',
    address: '新竹市東區光復路二段',
    phone: '03-571-0000',
    website: 'https://example.com',
    category: '系統開發',
    city: '新竹市',
    services: ['客製化系統開發', 'API 串接', 'AWS 雲端架構', '資安檢測'],
    cases: [
      { title: '物流管理後台', url: '#' },
      { title: '企業內部簽核系統', url: '#' }
    ]
  },
  {
    id: '5',
    name: '美學設計實驗室',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    shortDescription: '藝術與技術的結合，打造美術館等級的線上體驗。',
    fullDescription: '曾獲得多項國際設計大獎。我們視每一個網站為藝術品，精雕細琢每一個像素。\n適合重視品牌美學、高端精品的客戶。我們相信美學就是最強大的競爭力。',
    address: '台北市大安區敦化南路',
    phone: '02-2700-1111',
    website: 'https://example.com',
    category: '企業形象',
    city: '台北市',
    services: ['視覺設計', '3D 網頁特效', '品牌重塑'],
    cases: [
      { title: '建築事務所作品集', url: '#' },
      { title: '藝廊線上展廳', url: '#' }
    ]
  },
  {
    id: '6',
    name: '快速架站小幫手',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    shortDescription: '3天快上線，預算有限的最佳選擇。',
    fullDescription: '使用成熟的套版技術，大幅降低開發成本與時間。雖然是套版，但我們提供高度的客製化調整服務，確保網站不撞衫。\n專為剛起步的創業者設計的高CP值方案。',
    address: '台南市東區長榮路',
    phone: '06-200-9999',
    website: 'https://example.com',
    category: '活動頁面',
    city: '台南市',
    services: ['Wordpress 套版', '部落格建置', '基本 SEO'],
    cases: [
      { title: '個人部落格', url: '#' },
      { title: '餐廳菜單網站', url: '#' }
    ]
  }
];

// Helper to determine category from string (No longer strictly restricted by enum)
const mapCategory = (catStr: string): string => {
  if (!catStr) return '其他';
  return catStr.trim();
};

// Helper to parse cases
const parseCases = (casesData: any): CaseStudy[] => {
  if (Array.isArray(casesData)) return casesData;
  if (typeof casesData === 'string') {
    try {
      if (casesData.trim() === '') return [];
      // Attempt to clean JSON if needed (e.g. smart quotes)
      return JSON.parse(casesData);
    } catch (e) {
      console.warn("Failed to parse cases JSON:", casesData);
      return [];
    }
  }
  return [];
};

// Transform raw sheet data to Vendor type
const transformData = (rawData: any[]): Vendor[] => {
  return rawData.map(item => ({
    id: String(item.id),
    name: String(item.name || ''),
    imageUrl: String(item.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'),
    shortDescription: String(item.shortDescription || ''),
    fullDescription: String(item.fullDescription || item.shortDescription || ''),
    address: String(item.address || ''),
    phone: String(item.phone || ''),
    website: String(item.website || '#'),
    category: mapCategory(String(item.category || '')),
    city: String(item.city || '其他'),
    services: item.services ? String(item.services).split(',').map((s: string) => s.trim()) : [],
    cases: parseCases(item.cases),
    updatedAt: new Date().toISOString()
  }));
};

export const fetchVendors = async (): Promise<Vendor[]> => {
  const apiUrl = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
  const isDev = import.meta.env.DEV;

  // Use Mock if no API URL
  if (!apiUrl || apiUrl.includes('YOUR_WEB_APP_URL') || apiUrl === '') {
    console.log("使用模擬資料 (未設定 VITE_GOOGLE_SHEET_API_URL)");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_VENDORS);
      }, 600);
    });
  }

  try {
    // Determine Fetch URL
    // In Dev: use '/api' to go through Vite Proxy (Bypass CORS)
    // In Prod: use full apiUrl.
    // NOTE: Proxy target must be set in vite.config.ts using loadEnv
    const fetchUrl = isDev ? '/api' : apiUrl;

    console.log(`Fetching from: ${fetchUrl}`);

    const response = await fetch(fetchUrl, {
      method: "GET",
      // Proxy handles CORS. Standard fetch needs no special mode here if proxied.
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Check Content-Type to avoid parsing HTML (often happens on GAS error pages)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Received non-JSON response:", text);
      throw new Error("API 回傳了非 JSON 格式的資料 (可能為 Google Login 頁面或 Script 錯誤)");
    }

    const result = await response.json();

    // Support multiple common response formats
    // { status: 'success', data: [...] } OR { success: true, data: [...] }
    const dataList = result.data;

    if (Array.isArray(dataList)) {
      return transformData(dataList);
    } else {
      console.error("API format error:", result);
      throw new Error('API 回傳資料格式錯誤 (需包含 data 陣列)');
    }
  } catch (error) {
    console.error("Fetch vendors failed:", error);
    throw error;
  }
};