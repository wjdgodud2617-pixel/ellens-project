const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function extractOutputText(payload: any): string {
  if (typeof payload?.output_text === 'string') return payload.output_text;
  for (const item of payload?.output ?? []) {
    for (const part of item?.content ?? []) {
      if (part?.type === 'output_text' && typeof part?.text === 'string') return part.text;
    }
  }
  return '';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return json({ error: '로그인이 필요합니다.' }, 401);

  try {
    const { imageDataUrl, locale = 'ko-KR', mode = 'food' } = await req.json();
    if (typeof imageDataUrl !== 'string' || !imageDataUrl.startsWith('data:image/')) {
      return json({ error: '유효한 음식 사진이 필요합니다.' }, 400);
    }
    if (imageDataUrl.length > 8_000_000) return json({ error: '사진이 너무 큽니다.' }, 413);

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) return json({ error: 'OPENAI_API_KEY secret이 설정되지 않았습니다.' }, 500);
    const model = Deno.env.get('OPENAI_VISION_MODEL') || 'gpt-5-mini';

    const prompt = `You are a nutrition photo estimation service for a Korean fitness app. Analyze only visible foods in the image. Return ONLY valid JSON, without markdown or commentary, in this exact shape:\n{"items":[{"name":"Korean food name","amount":120,"unit":"g","kcal":250,"protein":20,"carbs":30,"fat":6,"confidence":75}],"note":"short Korean uncertainty note"}\nRules: use ${locale}; estimate edible portion; separate distinct foods; include sauces/oils when visually likely; all nutrition values are for the estimated amount, not per 100g; confidence is 0-100; if no food is visible return {"items":[],"note":"음식을 확인할 수 없습니다."}. Do not claim medical precision.`;

    const aiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [{
          role: 'user',
          content: [
            { type: 'input_text', text: prompt },
            { type: 'input_image', image_url: imageDataUrl, detail: 'high' },
          ],
        }],
      }),
    });

    const payload = await aiResponse.json();
    if (!aiResponse.ok) return json({ error: payload?.error?.message || 'AI 분석 요청에 실패했습니다.' }, 502);

    const text = extractOutputText(payload).trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    let parsed: any;
    try { parsed = JSON.parse(text); } catch { return json({ error: 'AI 결과를 해석하지 못했습니다.' }, 502); }
    if (mode === 'label') {
      const raw = parsed?.label && typeof parsed.label === 'object' ? parsed.label : {};
      const label = {
        productName: String(raw.productName || '제품명 미확인').slice(0, 120),
        totalAmount: Math.max(0, Number(raw.totalAmount) || 0), totalUnit: String(raw.totalUnit || 'g').slice(0, 12),
        basisAmount: Math.max(0, Number(raw.basisAmount) || 0), basisUnit: String(raw.basisUnit || 'g').slice(0, 12),
        servingsPerContainer: Math.max(0, Number(raw.servingsPerContainer) || 0),
        kcal: Math.max(0, Number(raw.kcal) || 0), protein: Math.max(0, Number(raw.protein) || 0),
        carbs: Math.max(0, Number(raw.carbs) || 0), fat: Math.max(0, Number(raw.fat) || 0),
        sugars: Math.max(0, Number(raw.sugars) || 0), sodium: Math.max(0, Number(raw.sodium) || 0),
        confidence: Math.min(100, Math.max(0, Number(raw.confidence) || 0)),
      };
      return json({ label, note: String(parsed?.note || ''), model });
    }
    const items = Array.isArray(parsed?.items) ? parsed.items.slice(0, 12) : [];
    return json({ items, note: String(parsed?.note || ''), model });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.' }, 500);
  }
});
