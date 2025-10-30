// api/get-help.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log("=== API 開始 ===");

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "未設定 API Key" });
    }

    const { question, lat, lng } = req.body;

    if (!question || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }

    console.log(`問題: ${question}, 位置: ${lat}, ${lng}`);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const modelsToTry = [
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    let lastError = null;
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`嘗試模型: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const prompt = `你是專業的寵物醫療助手。

使用者遇到的情況: ${question}
使用者的位置: 緯度 ${lat}, 經度 ${lng}

請用 JSON 格式回覆(只要純 JSON,不要其他文字):
{
  "advice": "根據情況提供簡短、實用的緊急處理建議,包含具體步驟",
  "mapUrl": "https://www.google.com/maps/search/動物醫院/@${lat},${lng},15z"
}

範例:
{
  "advice": "1. 立即用乾淨的布按壓止血\\n2. 避免寵物舔舐傷口\\n3. 保持寵物安靜,減少移動\\n4. 盡快送往最近的動物醫院\\n\\n⚠️ 這是緊急情況,建議立即就醫",
  "mapUrl": "https://www.google.com/maps/search/動物醫院/@${lat},${lng},15z"
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();
        
        console.log(`✓ 模型 ${modelName} 成功`);
        console.log("原始回應:", text);
        
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let data;
        try {
          data = JSON.parse(text);
          
          if (!data.advice || !data.mapUrl) {
            throw new Error("回應格式不完整");
          }
          
        } catch (parseError) {
          console.log("JSON 解析失敗,使用預設回應");
          data = {
            advice: "請立即聯繫動物醫院,保持寵物安靜並觀察症狀變化。如有流血請按壓止血。",
            mapUrl: `https://www.google.com/maps/search/動物醫院/@${lat},${lng},15z`
          };
        }

        console.log("最終回應:", data);
        return res.status(200).json(data);
        
      } catch (error) {
        console.log(`✗ 模型 ${modelName} 失敗: ${error.message}`);
        lastError = error;
        continue;
      }
    }

    console.error("所有模型都失敗:", lastError?.message);
    return res.status(200).json({
      advice: "請立即前往最近的動物醫院尋求專業協助。在前往醫院的途中,請保持寵物安靜,避免移動受傷部位。",
      mapUrl: `https://www.google.com/maps/search/動物醫院/@${lat},${lng},15z`
    });

  } catch (error) {
    console.error("嚴重錯誤:", error);
    const { lat, lng } = req.body || {};
    return res.status(200).json({
      advice: "系統暫時無法提供建議,請直接聯繫動物醫院。",
      mapUrl: lat && lng ? `https://www.google.com/maps/search/動物醫院/@${lat},${lng},15z` : "https://www.google.com/maps/search/動物醫院"
    });
  }
}