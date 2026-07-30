const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
  try { return JSON.parse(cleaned); } catch (_) {}
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
  throw new Error("AI 응답을 JSON으로 해석하지 못했습니다.");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "POST 요청만 지원합니다." }, 405);

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "로그인이 필요합니다." }, 401);

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) return jsonResponse({ error: "OPENAI_API_KEY가 Supabase Secrets에 설정되지 않았습니다." }, 500);

    const { imageDataUrl, locale = "ko-KR", mode = "food" } = await req.json();
    if (typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image/")) {
      return jsonResponse({ error: "올바른 이미지가 전달되지 않았습니다." }, 400);
    }
    if (imageDataUrl.length > 20_000_000) return jsonResponse({ error: "이미지 용량이 너무 큽니다." }, 413);

    const model = Deno.env.get("OPENAI_VISION_MODEL") || "gpt-4.1-mini";
    const isLabel = mode === "label";
    const instruction = isLabel
      ? `한국 식품 포장지의 영양정보표 이미지를 분석하세요. 보이는 정보만 사용하고 추측은 최소화하세요.
반드시 아래 JSON 객체 하나만 반환하세요.
{
  "label": {
    "productName": "제품명 또는 미확인",
    "totalAmount": 0,
    "basisAmount": 0,
    "basisUnit": "g",
    "kcal": 0,
    "carbs": 0,
    "protein": 0,
    "fat": 0,
    "sugars": 0,
    "sodium": 0,
    "confidence": 0
  },
  "note": "사용자가 이해하기 쉬운 한국어 한 줄 설명"
}
규칙:
- totalAmount는 제품 전체 총 내용량입니다.
- basisAmount는 영양성분 수치가 적용되는 기준량(1회 제공량, 100g당 등)입니다.
- basisUnit은 g, ml, 개 중 하나를 우선 사용하세요.
- kcal는 기준량당 열량, carbs/protein/fat/sugars는 g, sodium은 mg입니다.
- 표에 없는 값은 0으로 두세요.
- confidence는 0~100 정수입니다.
- 총 내용량당/100g당/1회 제공량당 열이 여러 개면 사용자가 실제 섭취량을 환산하기 가장 명확한 열 하나를 선택하세요.
- locale: ${locale}`
      : `음식 사진을 분석해 아래 JSON 객체 하나만 반환하세요.
{"items":[{"name":"음식명","amount":100,"unit":"g","kcal":0,"protein":0,"carbs":0,"fat":0,"confidence":0}]}
사진에 실제로 보이는 음식과 음료를 각각 구분해서 포함하세요. 접시, 용기, 손, 식기 등은 제외하세요. 음식명이 불확실하면 넓은 범주의 한국어 이름을 사용하세요. amount는 사진에서 추정한 실제 섭취량, 영양값은 해당 amount 기준의 합리적인 추정치로 작성하세요. 최소 한 가지 음식이 보이면 items를 비우지 마세요. locale: ${locale}`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        max_tokens: 1200,
        response_format: { type: "json_object" },
        messages: [{
          role: "user",
          content: [
            { type: "text", text: instruction },
            { type: "image_url", image_url: { url: imageDataUrl, detail: "high" } },
          ],
        }],
      }),
    });

    const raw = await openaiRes.text();
    if (!openaiRes.ok) {
      console.error("OpenAI error", openaiRes.status, raw);
      return jsonResponse({ error: `AI 분석 요청에 실패했습니다. (${openaiRes.status})` }, 502);
    }

    const payload = JSON.parse(raw);
    const text = payload?.choices?.[0]?.message?.content;
    if (!text) return jsonResponse({ error: "AI 분석 결과가 비어 있습니다." }, 502);
    const result = extractJson(text);
    return jsonResponse(result);
  } catch (error) {
    console.error(error);
    return jsonResponse({ error: error instanceof Error ? error.message : "분석 중 오류가 발생했습니다." }, 500);
  }
});
