/**
 * Google Apps Script - Vendor API (Updated)
 * 
 * Update at: 2026-02-05
 * 
 * 部署說明：
 * 1. 複製此程式碼
 * 2. 貼上覆蓋 Apps Script 編輯器中的內容
 * 3. 點選「儲存」
 * 4. 點選「部署」 > 「管理部署」 > 點選右上角「鉛筆」圖示編輯
 * 5. 版本：選擇「建立新版本」(New Version) !!!重要!!!
 * 6. 點選「部署」
 */

const SHEET_NAME = "Vendors";

function doGet(e) {
  try {
    const data = getSheetData();
    
    // 回傳成功格式
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      success: true, // 相容性欄位
      data: data,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    // 回傳錯誤格式
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      success: false,
      error: err.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // 如果找不到作用中的試算表，嘗試用 ID (若您是獨立腳本請填寫 ID)
  // const ss = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
  
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(`找不到工作表: ${SHEET_NAME}。請確認工作表名稱正確。`);
  }
  
  const range = sheet.getDataRange();
  const rows = range.getValues();
  
  if (rows.length === 0) return [];

  const headers = rows[0];
  const data = [];
  
  // 從第二列開始讀取
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    
    // 將陣列轉為物件
    for (let j = 0; j < headers.length; j++) {
      const header = String(headers[j]).trim();
      let value = row[j];
      
      // 1. 日期處理 (參考您的修正)
      if (value instanceof Date) {
        // 轉為 YYYY-MM-DD
        value = Utilities.formatDate(value, 'Asia/Taipei', 'yyyy-MM-dd');
      }
      
      // 2. 空白字串處理
      if (typeof value === 'string') {
        value = value.trim();
      }
      
      // 3. active 欄位未填視為 false
      if (header === 'active' && value === "") {
        value = false;
      }

      obj[header] = value;
    }
    
    // 簡單過濾：ID 必須存在
    if (obj.id) {
       // 若 active 為 FALSE 則跳過
       if (obj.hasOwnProperty('active') && (obj.active === false || obj.active === "FALSE")) {
         continue;
       }
       data.push(obj);
    }
  }
  
  return data;
}
