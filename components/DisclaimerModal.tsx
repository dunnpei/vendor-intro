import React, { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface DisclaimerModalProps {
    onAccept: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAccept }) => {
    // 禁止背景捲動
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-6 bg-primary-600 text-white flex items-center gap-3">
                    <ShieldCheck size={32} />
                    <h2 className="text-2xl font-bold">網站聲明與使用條款</h2>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8">
                    <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
                        <p className="text-lg font-semibold text-slate-800">
                            親愛的住戶您好，在您開始瀏覽「大學城哈佛-特約廠商」資訊前，請先閱讀並同意以下條款：
                        </p>

                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-sm leading-relaxed">
                            <section>
                                <h3 className="font-bold text-slate-800 mb-1">1. 優惠使用說明</h3>
                                <p>消費時須出示指定認證標誌始可獲得相關優惠，若未持指定認證標誌，特約廠商得拒絕提供優惠。</p>
                            </section>

                            <section>
                                <h3 className="font-bold text-slate-800 mb-1">2. 個人資料保護</h3>
                                <p>本網不會主動蒐集您的個人私密資料。若您透過本站連結至外部網站或與廠商聯繫，請注意個人資訊安全。</p>
                            </section>

                            <section>
                                <h3 className="font-bold text-slate-800 mb-1">3. 免責聲明</h3>
                                <p>本網僅提供廠商資訊媒合，並不對廠商提供之產品或服務品質作任何擔保。若發生消費爭議，請逕洽該廠商處理。</p>
                            </section>

                            <section>
                                <h3 className="font-bold text-slate-800 mb-1">4. 智慧財產權</h3>
                                <p>本網內容（含商標、圖文、排版）均受著作權保護，未經書面許可請勿擅自擷取、轉載或作為商業用途。</p>
                            </section>
                        </div>

                        
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center">
                    <button
                        onClick={onAccept}
                        className="w-full md:w-auto px-12 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-primary-200 transition-all active:scale-95 duration-200 flex items-center justify-center gap-2"
                    >
                        我已閱讀並同意以上條款
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;
